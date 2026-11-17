export type CrmCargo = "Administrador" | "Normal" | "Proprietário" | "Inquilino";

export interface CrmUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  crmCargo: CrmCargo;
  siteRole: "locador" | "locatario" | "admin";
}

export const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.araujoimoveiscaratinga.com.br";

export const CRM_BASE_URL =
  process.env.NEXT_PUBLIC_CRM_URL || "https://crmaraujoimoveis.vercel.app";

// Base de Usuários cadastrados na aba de Usuários do CRM Araújo Imóveis (https://crmaraujoimoveis.vercel.app/)
export const CRM_REGISTERED_USERS: CrmUser[] = [
  {
    id: "crm-user-miguel-pessoal",
    name: "Miguel",
    email: "miguelmr.pessoal@gmail.com",
    crmCargo: "Proprietário",
    siteRole: "locador",
  },
  {
    id: "crm-user-miguel-biz",
    name: "Miguel",
    email: "miguelmr.business@gmail.com",
    crmCargo: "Proprietário",
    siteRole: "locador",
  },
  {
    id: "crm-user-marcelo-ia",
    name: "Marcelo",
    email: "marcaiasolucoes@gmail.com",
    crmCargo: "Administrador",
    siteRole: "admin",
  },
  {
    id: "crm-user-marcelo",
    name: "Marcelo",
    email: "marcalasolucoes@gmail.com",
    crmCargo: "Administrador",
    siteRole: "admin",
  },
  {
    id: "user_1789587106818",
    name: "Dcckkdncnkdnk",
    email: "dcckkdncnkdnk@gmail.com",
    crmCargo: "Inquilino",
    siteRole: "locatario",
  },
  {
    id: "user_1789588685589",
    name: "33d3d33",
    email: "33d3d33@gmail.com",
    crmCargo: "Inquilino",
    siteRole: "locatario",
  },
  {
    id: "crm-user-inquilino-portal",
    name: "Inquilino Demo",
    email: "inquilino@portal.com",
    crmCargo: "Inquilino",
    siteRole: "locatario",
  },
  {
    id: "crm-user-inquilino-araujo",
    name: "Inquilino",
    email: "inquilino@araujo.com",
    crmCargo: "Inquilino",
    siteRole: "locatario",
  },
  {
    id: "crm-user-proprietario-portal",
    name: "Proprietário Demo",
    email: "proprietario@portal.com",
    crmCargo: "Proprietário",
    siteRole: "locador",
  },
  {
    id: "crm-user-proprietario-araujo",
    name: "Proprietário",
    email: "proprietario@araujo.com",
    crmCargo: "Proprietário",
    siteRole: "locador",
  },
  {
    id: "crm-user-admin-araujo",
    name: "Administrador",
    email: "admin@araujo.com",
    crmCargo: "Administrador",
    siteRole: "admin",
  },
];

export function normalizeCrmRole(rawRole?: string): {
  crmCargo: CrmCargo;
  siteRole: "locador" | "locatario" | "admin";
} {
  const clean = (rawRole || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (clean.includes("inquilino") || clean.includes("locatario")) {
    return { crmCargo: "Inquilino", siteRole: "locatario" };
  }
  if (clean.includes("proprietario") || clean.includes("locador")) {
    return { crmCargo: "Proprietário", siteRole: "locador" };
  }
  if (clean.includes("normal") || clean.includes("corretor") || clean.includes("operador")) {
    return { crmCargo: "Normal", siteRole: "admin" };
  }
  if (clean.includes("admin")) {
    return { crmCargo: "Administrador", siteRole: "admin" };
  }
  return { crmCargo: "Proprietário", siteRole: "locador" };
}

/**
 * Busca a lista atualizada de usuários diretamente da API do CRM e mescla com a base padrão.
 */
export async function fetchLiveCrmUsers(): Promise<CrmUser[]> {
  const mergedMap = new Map<string, CrmUser>();

  for (const user of CRM_REGISTERED_USERS) {
    mergedMap.set(user.email.trim().toLowerCase(), user);
  }

  try {
    const res = await fetch(`${CRM_BASE_URL}/api/users`, {
      method: "GET",
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const rawList = Array.isArray(data)
        ? data
        : Array.isArray(data?.value)
        ? data.value
        : [];

      for (const item of rawList) {
        if (item && typeof item.email === "string" && item.email.includes("@")) {
          const cleanEmail = item.email.trim().toLowerCase();
          const { crmCargo, siteRole } = normalizeCrmRole(item.role || item.cargo || item.crmCargo);
          mergedMap.set(cleanEmail, {
            id: String(item.id || `crm-${cleanEmail}`),
            name: String(item.name || item.nome || cleanEmail.split("@")[0]),
            email: cleanEmail,
            password: item.password ? String(item.password) : undefined,
            crmCargo,
            siteRole,
          });
        }
      }
    }
  } catch (err) {
    console.warn("Não foi possível consultar /api/users em tempo real, usando base local:", err);
  }

  return Array.from(mergedMap.values());
}

/**
 * Busca usuário cadastrado no CRM exclusivamente pelo E-mail.
 */
export function findCrmUser(
  emailInput: string,
  userList: CrmUser[] = CRM_REGISTERED_USERS
): CrmUser | undefined {
  if (!emailInput || !emailInput.trim()) return undefined;
  const cleanEmail = emailInput.trim().toLowerCase();

  return (
    userList.find((user) => user.email.trim().toLowerCase() === cleanEmail) ||
    CRM_REGISTERED_USERS.find((user) => user.email.trim().toLowerCase() === cleanEmail)
  );
}

/**
 * Constrói a URL de redirecionamento no CRM com base na função do usuário no CRM (Proprietário, Inquilino ou Admin).
 */
export function getCrmRedirectUrl(
  emailInput: string,
  passwordInput?: string,
  userList: CrmUser[] = CRM_REGISTERED_USERS,
  fallbackRole?: "locatario" | "locador"
): string {
  const crmUser = findCrmUser(emailInput, userList);

  let crmRoleParam = fallbackRole === "locador" ? "proprietario" : "inquilino";
  let userEmail = emailInput.trim().toLowerCase();

  if (crmUser) {
    userEmail = crmUser.email.trim().toLowerCase();
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
    email: userEmail,
    origin: SITE_BASE_URL,
  });

  if (passwordInput && passwordInput.trim()) {
    queryParams.set("password", passwordInput.trim());
    queryParams.set("pass", passwordInput.trim());
  }

  return `${CRM_BASE_URL}/?${queryParams.toString()}`;
}
