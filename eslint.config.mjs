import prettier from "eslint-config-prettier"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { FlatCompat } from "@eslint/eslintrc"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import { includeIgnoreFile } from "@eslint/compat"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})
const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

const eslintConfig = [
	includeIgnoreFile(gitignorePath),
	...compat.extends("next/core-web-vitals", "next/typescript"),
	prettier,
	eslintPluginUnicorn.configs.recommended,
	{
		rules: {
			"unicorn/filename-case": [
				"error",
				{
					cases: {
						camelCase: true,
						pascalCase: true,
					},
					multipleFileExtensions: false,
				},
			],
			"unicorn/number-literal-case": "off",
			"unicorn/prefer-top-level-await": "off",
		},
	},
]

export default eslintConfig
