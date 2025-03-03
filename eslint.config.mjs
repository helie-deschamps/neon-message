import prettier from "eslint-config-prettier"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { FlatCompat } from "@eslint/eslintrc"
import eslintPluginUnicorn from "eslint-plugin-unicorn"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
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
		},
	},
]

export default eslintConfig
