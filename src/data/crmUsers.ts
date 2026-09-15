export type CrmCargo = "Administrador" | "Normal" | "Proprietário" | "Inquilino";

export interface CrmUser {
  id: string;
  name: string;
  email: string;
  cpfCnpj?: string;
  crmCargo: CrmCargo;
  siteRole: "locador" | "locatario" | "admin";
}

// Registered CRM Araújo Imóveis accounts
export const CRM_REGISTERED_USERS: CrmUser[] = [
  {
    id: "crm-user-miguel",
    name: "miguel",
    email: "miguelmr.pessoal@gmail.com",
    cpfCnpj: "111.222.333-44",
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
 * Constructs the direct destination URL in CRM Araújo Imóveis tailored specifically
 * to the user's role (Proprietário vs Inquilino vs Admin) in the CRM.
 */
export function getCrmRedirectUrl(identifier: string, activeRole?: "locatario" | "locador"): string {
  const crmUser = findCrmUser(identifier);
  
  let crmRoleParam = activeRole === "locador" ? "proprietario" : "inquilino";
  let userIdentifier = identifier || "cliente@araujo.com";

  if (crmUser) {
    userIdentifier = crmUser.email;
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
    identifier: userIdentifier,
    email: userIdentifier
  });

  return `${CRM_BASE_URL}/?${queryParams.toString()}`;
}
