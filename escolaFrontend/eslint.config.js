import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
// 1. Importar os pacotes do Prettier
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin, // 2. Registrar o plugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // 3. Mesclar as regras recomendadas manualmente (Flat Config style)
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // 4. Ativar o Prettier como uma regra do ESLint
      'prettier/prettier': 'error',

      // Permite criar arquivos .js com código JSX (O professor desativou a trava)
      'react/jsx-filename-extension': 0,

      // Permite exportar apenas uma coisa do arquivo sem ser default (Muito útil!)
      'import/prefer-default-export': 0,

      // Garante que você use Hooks do jeito certo (O Vite já costuma vir com isso, mas é bom reforçar)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  // 5. IMPORTANTE: O prettierConfig deve ser o ÚLTIMO para desativar conflitos
  prettierConfig,
]);
