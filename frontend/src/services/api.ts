const API_BASE_URL = 'http://localhost:3000/api';

interface Recipe {
  id: number;
  titulo: string;
  descricao: string;
  ingredientes: string[];
  modoPreparo: string;
  fotoUrl: string;
  dataPublicacao: string;
  dataAtualizacao: string;
  autor: {
    nome: string;
  };
}

interface RecipeResponse {
  data: Recipe[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface Like {
  id: number;
  autorId: number;
  receitaId: number;
  dataCurtida: string;
}

interface SignupPayload {
  nome: string;
  senha: string;
}

interface LoginPayload {
  nome: string;
  senha: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  error?: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export const authService = {
  async signup(nome: string, password: string): Promise<SignupResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          senha: password,
        } as SignupPayload),
      });

      if (response.status === 204) {
        return {
          success: true,
          data: {},
        };
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Erro ao criar conta',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro na conexão',
      };
    }
  },

  async login(nome: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          senha: password,
        } as LoginPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Erro ao fazer login',
        };
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return {
        success: true,
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro na conexão',
      };
    }
  },
};

export const recipeService = {
  async getRecipes(page: number = 1, limit: number = 30): Promise<RecipeResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/receitas?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar receitas');
      }

      const data: RecipeResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      throw error;
    }
  },

  async likeRecipe(recipeId: number, token: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/curtidas/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        return { success: true };
      }

      const data = await response.json();
      return {
        success: false,
        error: data.message || 'Erro ao curtir receita',
      };
    } catch (error) {
      console.error('Erro ao curtir receita:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro na conexão',
      };
    }
  },

  async getLikes(recipeId: number): Promise<{ count: number; likes?: Like[]; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/curtidas/${recipeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar curtidas');
      }

      const data: Like[] = await response.json();
      return { count: data.length, likes: data };
    } catch (error) {
      console.error('Erro ao buscar curtidas:', error);
      return {
        count: 0,
        error: error instanceof Error ? error.message : 'Erro na conexão',
      };
    }
  },
};
