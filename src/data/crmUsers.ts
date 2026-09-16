export type CrmCargo = "Administrador" | "Normal" | "Proprietário" | "Inquilino";

export interface CrmUser {
  id: string;
  name: string;
  email: string;
  cpfCnpj?: string;
  crmCargo: CrmCargo;
  siteRole: "locador" | "locatario" | "admin";
}

// Registered CRM Araújo Imóveis accounts matching crmaraujoimoveis.vercel.app
export const CRM_REGISTERED_USERS: CrmUser[] = [
  {
    id: "crm-user-miguel-pessoal",
    name: "Miguel",
    email: "miguelmr.pessoal@gmail.com",
    cpfCnpj: "111.222.333-44",
    crmCargo: "Proprietário",
    siteRole: "locador"
  },
  {
    id: "crm-user-miguel-biz",
    name: "Miguel",
    email: "miguelmr.business@gmail.com",
    cpfCnpj: "111.222.333-45",
    crmCargo: "Proprietário",
    siteRole: "locador"
  },
  {
    id: "crm-user-marcelo",
    name: "Marcelo",
    email: "marcalasolucoes@gmail.com",
    cpfCnpj: "222.333.444-55",
    crmCargo: "Administrador",
    siteRole: "admin"
  },
  {
    id: "crm-user-inquilino-portal",
    name: "Inquilino Demo",
    email: "inquilino@portal.com",
    cpfCnpj: "444.555.666-77",
    crmCargo: "Inquilino",
    siteRole: "locatario"
  },
  {
    id: "crm-user-inquilino-araujo",
    name: "Inquilino",
    email: "inquilino@araujo.com",
    cpfCnpj: "444.555.666-78",
    crmCargo: "Inquilino",
    siteRole: "locatario"
  },
  {
    id: "crm-user-proprietario-portal",
    name: "Proprietário Demo",
    email: "proprietario@portal.com",
    cpfCnpj: "333.444.555-66",
    crmCargo: "Proprietário",
    siteRole: "locador"
  },
  {
    id: "crm-user-proprietario-araujo",
    name: "Proprietário",
    email: "proprietario@araujo.com",
    cpfCnpj: "333.444.555-67",
    crmCargo: "Proprietário",
    siteRole: "locador"
  },
  {
    id: "crm-user-admin-araujo",
    name: "Administrador",
    email: "admin@araujo.com",
    cpfCnpj: "000.000.000-00",
    crmCargo: "Administrador",
    siteRole: "admin"
  }
];

export const CRM_BASE_URL = process.env.NEXT_PUBLIC_CRM_URL || "https://crmaraujoimoveis.vercel.app";

/**
 * Searches for a registered CRM user by exact email, exact CPF/CNPJ or full name.
 * Loose partial matches are strictly forbidden to prevent unauthorized/empty sessions.
 */
export function findCrmUser(identifier: string): CrmUser | undefined {
  if (!identifier || !identifier.trim()) return undefined;
  const raw = identifier.trim().toLowerCase();
  const numericOnly = raw.replace(/\D/g, "");
  
  return CRM_REGISTERED_USERS.find((user) => {
    const cleanEmail = user.email.toLowerCase();
    const cleanCpf = user.cpfCnpj ? user.cpfCnpj.replace(/\D/g, "") : "";
    const cleanName = user.name.toLowerCase();
    
    // 1. Exact email match
    if (cleanEmail === raw) return true;
    
    // 2. Exact CPF/CNPJ numeric match
    if (numericOnly.length >= 8 && cleanCpf && cleanCpf === numericOnly) return true;
    
    // 3. Exact full name match
    if (cleanName === raw) return true;

    return false;
  });
}

/**
 * Constructs the direct destination URL in CRM Araújo Imóveis tailored specifically
 * to the user's role (Proprietário vs Inquilino vs Admin) in the CRM.
 */
export function getCrmRedirectUrl(identifier: string, activeRole?: "locatario" | "locador"): string {
  const crmUser = findCrmUser(identifier);
  
  let crmRoleParam = activeRole === "locador" ? "proprietario" : "inquilino";
  let userEmail = identifier;

  if (crmUser) {
    userEmail = crmUser.email;
    if (crmUser.crmCargo === "Proprietário") {
      crmRoleParam = "proprietario";
    } else if (crmUser.crmCargo === "Inquilino") {
      crmRoleParam = "inquilino";
    } else if (crmUser.crmCargo === "Administrador" || crmUser.crmCargo === "Normal") {
      crmRoleParam = "admin";
    }
  }

  const queryParams = new URLSearchParams({
    role: crmRoleParam,
    portal: crmRoleParam,
    area: crmRoleParam,
    identifier: userEmail,
    email: userEmail
  });

  return `${CRM_BASE_URL}/?${queryParams.toString()}`;
}
