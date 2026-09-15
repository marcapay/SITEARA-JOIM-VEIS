export type CrmCargo = "Administrador" | "Normal" | "Proprietário" | "Inquilino";

export interface CrmUser {
  id: string;
  name: string;
  email: string;
  cpfCnpj?: string;
  crmCargo: CrmCargo;
  siteRole: "locador" | "locatario" | "admin";
  propertyTitle?: string;
  propertyAddress?: string;
  rentValue?: string;
  description: string;
}

// Database of CRM Araújo Imóveis members (matching exact roles in CRM Configurações > Usuários)
export const CRM_REGISTERED_USERS: CrmUser[] = [
  {
    id: "crm-user-miguel",
    name: "miguel",
    email: "miguelmr.pessoal@gmail.com",
    cpfCnpj: "111.222.333-44",
    crmCargo: "Proprietário",
    siteRole: "locador",
    propertyTitle: "Casa Residencial",
    propertyAddress: "Rua Capitão Paiva, 202 - Centro, Caratinga/MG",
    rentValue: "R$ 2.499,98",
    description: "Proprietário cadastrado no CRM (Área do Proprietário)"
  },
  {
    id: "crm-user-mariana",
    name: "Mariana",
    email: "mariana@araujo.com",
    cpfCnpj: "333.444.555-66",
    crmCargo: "Inquilino",
    siteRole: "locatario",
    propertyTitle: "Casa Residencial",
    propertyAddress: "Rua Capitão Paiva, 202 - Caratinga/MG",
    rentValue: "R$ 2.499,98",
    description: "Inquilina cadastrada no CRM (Área do Inquilino)"
  },
  {
    id: "crm-user-inquilino-demo",
    name: "Inquilino Demo",
    email: "inquilino@araujo.com",
    cpfCnpj: "444.555.666-77",
    crmCargo: "Inquilino",
    siteRole: "locatario",
    propertyTitle: "Apartamento 2 Quartos",
    propertyAddress: "Rua João Pinheiro, 85 - Caratinga/MG",
    rentValue: "R$ 1.850,00",
    description: "Inquilino cadastrado no CRM (Área do Inquilino)"
  },
  {
    id: "crm-user-marcelo",
    name: "Marcelo",
    email: "marcalasolucoes@gmail.com",
    cpfCnpj: "222.333.444-55",
    crmCargo: "Administrador",
    siteRole: "admin",
    description: "Administrador do CRM Araújo Imóveis (Acesso à equipe/gestão)"
  }
];

export const CRM_BASE_URL = process.env.NEXT_PUBLIC_CRM_URL || "https://crmaraujoimoveis.vercel.app";

/**
 * Searches for a registered CRM user by email, CPF or name.
 */
export function findCrmUser(identifier: string): CrmUser | undefined {
  if (!identifier) return undefined;
  const cleanSearch = identifier.trim().toLowerCase().replace(/[^\w@.]/g, "");
  
  return CRM_REGISTERED_USERS.find((user) => {
    const cleanEmail = user.email.toLowerCase();
    const cleanCpf = user.cpfCnpj ? user.cpfCnpj.replace(/\D/g, "") : "";
    const cleanSearchNumeric = cleanSearch.replace(/\D/g, "");
    
    if (cleanEmail === cleanSearch) return true;
    if (cleanCpf && cleanSearchNumeric && cleanCpf === cleanSearchNumeric) return true;
    if (user.name.toLowerCase() === cleanSearch) return true;
    return false;
  });
}

/**
 * Returns true if the CRM role is a client role (Proprietário or Inquilino).
 * Administrador and Normal (operadores) are staff roles and should be ignored/redirected to admin.
 */
export function isClientRole(cargo: CrmCargo): boolean {
  return cargo === "Proprietário" || cargo === "Inquilino";
}

/**
 * Calculates the target URL based strictly on CRM Cargo:
 * - Proprietário -> /area-do-cliente?role=proprietario
 * - Inquilino -> /area-do-cliente?role=inquilino
 * - Administrador / Normal -> https://crmaraujoimoveis.vercel.app (painel de administração)
 */
export function getTargetPortalUrl(identifier: string, fallbackRole: "locatario" | "locador"): {
  url: string;
  isExternalCrm: boolean;
  roleParam: "proprietario" | "inquilino" | "admin";
  crmCargo?: CrmCargo;
  userName?: string;
  message: string;
} {
  const crmUser = findCrmUser(identifier);

  if (crmUser) {
    if (crmUser.crmCargo === "Proprietário") {
      return {
        url: `/area-do-cliente?role=proprietario&identifier=${encodeURIComponent(crmUser.email)}`,
        isExternalCrm: false,
        roleParam: "proprietario",
        crmCargo: "Proprietário",
        userName: crmUser.name,
        message: `Usuário '${crmUser.name}' identificado como PROPRIETÁRIO no CRM. Redirecionando para a Área do Proprietário.`
      };
    }
    
    if (crmUser.crmCargo === "Inquilino") {
      return {
        url: `/area-do-cliente?role=inquilino&identifier=${encodeURIComponent(crmUser.email)}`,
        isExternalCrm: false,
        roleParam: "inquilino",
        crmCargo: "Inquilino",
        userName: crmUser.name,
        message: `Usuário '${crmUser.name}' identificado como INQUILINO no CRM. Redirecionando para a Área do Inquilino.`
      };
    }

    // Administrador ou Normal
    return {
      url: `${CRM_BASE_URL}/?role=admin&identifier=${encodeURIComponent(crmUser.email)}`,
      isExternalCrm: true,
      roleParam: "admin",
      crmCargo: crmUser.crmCargo,
      userName: crmUser.name,
      message: `Usuário '${crmUser.name}' é ${crmUser.crmCargo.toUpperCase()} de equipe no CRM. Redirecionando para o Painel Administrativo.`
    };
  }

  // Fallback based on selected tab on site
  const targetRole = fallbackRole === "locador" ? "proprietario" : "inquilino";
  return {
    url: `/area-do-cliente?role=${targetRole}&identifier=${encodeURIComponent(identifier)}`,
    isExternalCrm: false,
    roleParam: targetRole,
    message: `Redirecionando para a ${targetRole === "proprietario" ? "Área do Proprietário" : "Área do Inquilino"}...`
  };
}

/**
 * Direct link to CRM external portal URL with matching role parameter
 */
export function getCrmRedirectUrl(role: "locatario" | "locador", identifier: string): string {
  const crmUser = findCrmUser(identifier);
  
  let crmRoleParam = role === "locador" ? "proprietario" : "inquilino";
  if (crmUser) {
    if (crmUser.crmCargo === "Proprietário") crmRoleParam = "proprietario";
    if (crmUser.crmCargo === "Inquilino") crmRoleParam = "inquilino";
    if (crmUser.crmCargo === "Administrador" || crmUser.crmCargo === "Normal") crmRoleParam = "admin";
  }

  const userIdentifier = crmUser ? crmUser.email : (identifier || "cliente@araujo.com");
  const userName = crmUser ? crmUser.name : (crmRoleParam === "proprietario" ? "miguel" : "Mariana");
  
  const queryParams = new URLSearchParams({
    role: crmRoleParam,
    portal: crmRoleParam,
    area: crmRoleParam,
    identifier: userIdentifier,
    email: userIdentifier,
    name: userName
  });

  return `${CRM_BASE_URL}/?${queryParams.toString()}`;
}
