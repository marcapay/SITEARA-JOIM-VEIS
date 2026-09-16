export type CrmCargo = "Administrador" | "Normal" | "Proprietário" | "Inquilino";

export interface CrmUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  crmCargo: CrmCargo;
  siteRole: "locador" | "locatario" | "admin";
}

// Base de Usuários cadastrados na aba de Usuários do CRM Araújo Imóveis (https://crmaraujoimoveis.vercel.app/)
export const CRM_REGISTERED_USERS: CrmUser[] = [
  {
    id: "crm-user-miguel-pessoal",
    name: "Miguel",
    email: "miguelmr.pessoal@gmail.com",
    crmCargo: "Proprietário",
    siteRole: "locador"
  },
  {
    id: "crm-user-miguel-biz",
    name: "Miguel",
    email: "miguelmr.business@gmail.com",
    crmCargo: "Proprietário",
    siteRole: "locador"
  },
  {
    id: "crm-user-marcelo",
    name: "Marcelo",
    email: "marcalasolucoes@gmail.com",
    crmCargo: "Administrador",
    siteRole: "admin"
  },
  {
    id: "crm-user-inquilino-portal",
    name: "Inquilino Demo",
    email: "inquilino@portal.com",
    crmCargo: "Inquilino",
    siteRole: "locatario"
  },
  {
    id: "crm-user-inquilino-araujo",
    name: "Inquilino",
    email: "inquilino@araujo.com",
    crmCargo: "Inquilino",
    siteRole: "locatario"
  },
  {
    id: "crm-user-proprietario-portal",
    name: "Proprietário Demo",
    email: "proprietario@portal.com",
    crmCargo: "Proprietário",
    siteRole: "locador"
  },
  {
    id: "crm-user-proprietario-araujo",
    name: "Proprietário",
    email: "proprietario@araujo.com",
    crmCargo: "Proprietário",
    siteRole: "locador"
  },
  {
    id: "crm-user-admin-araujo",
    name: "Administrador",
    email: "admin@araujo.com",
    crmCargo: "Administrador",
    siteRole: "admin"
  }
];

export const CRM_BASE_URL = process.env.NEXT_PUBLIC_CRM_URL || "https://crmaraujoimoveis.vercel.app";

/**
 * Busca usuário cadastrado no CRM exclusivamente pelo E-mail.
 */
export function findCrmUser(emailInput: string): CrmUser | undefined {
  if (!emailInput || !emailInput.trim()) return undefined;
  const cleanEmail = emailInput.trim().toLowerCase();
  
  return CRM_REGISTERED_USERS.find((user) => user.email.toLowerCase() === cleanEmail);
}

/**
 * Constrói a URL de redirecionamento no CRM com base na função do usuário no CRM (Proprietário ou Inquilino).
 */
export function getCrmRedirectUrl(emailInput: string, passwordInput?: string): string {
  const crmUser = findCrmUser(emailInput);
  
  let crmRoleParam = "inquilino";
  let userEmail = emailInput.trim().toLowerCase();

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

  if (passwordInput && passwordInput.trim()) {
    queryParams.set("password", passwordInput.trim());
    queryParams.set("pass", passwordInput.trim());
  }

  return `${CRM_BASE_URL}/?${queryParams.toString()}`;
}
