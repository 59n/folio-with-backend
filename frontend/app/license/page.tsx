import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import Footer from '@/components/Footer'
import ClickableTitle from '@/components/ClickableTitle'

export const metadata: Metadata = {
  title: siteConfig.meta.titleTemplate.replace('%s', 'License'),
  description: `License information for ${siteConfig.name}`,
}

function getLicenseText(licenseType: string): string {
  const licenses: Record<string, string> = {
    MIT: `MIT License

Copyright (c) ${new Date().getFullYear()} ${siteConfig.footer.copyright.text}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,

    BSD: `BSD License

Copyright (c) ${new Date().getFullYear()}, ${siteConfig.footer.copyright.text}
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`,

    'GPL-3.0': `GNU General Public License v3.0

Copyright (c) ${new Date().getFullYear()} ${siteConfig.footer.copyright.text}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`,

    'AGPL-3.0': `GNU Affero General Public License v3.0

Copyright (c) ${new Date().getFullYear()} ${siteConfig.footer.copyright.text}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`,

    WTFPL: `DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) ${new Date().getFullYear()} ${siteConfig.footer.copyright.text}

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.`,
  }

  return licenses[licenseType] || `License: ${licenseType}

Copyright (c) ${new Date().getFullYear()} ${siteConfig.footer.copyright.text}

For full license text, please visit the official ${licenseType} license page.`
}

export default function LicensePage() {
  const licenseType = siteConfig.footer.copyright.license.type
  const licenseText = getLicenseText(licenseType)

  return (
    <main 
      className="flex min-h-screen items-center justify-center antialiased"
      style={{
        backgroundColor: siteConfig.colors.background,
        color: siteConfig.colors.foreground,
      }}
    >
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="mb-8">
          <ClickableTitle />
        </div>

        <article className="mb-12">
          <Link
            href="/"
            className="mb-6 inline-block text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="mb-4 text-4xl font-normal text-white">License</h1>
          <p className="mb-8 text-sm text-gray-500">
            {siteConfig.footer.copyright.text} - {licenseType} License
          </p>
          <div
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-semibold
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-pre:bg-gray-900 prose-pre:text-gray-300 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
              prose-pre:whitespace-pre-wrap prose-pre:font-mono prose-pre:text-sm"
          >
            <pre className="bg-gray-900 text-gray-300 rounded-lg p-6 overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {licenseText}
            </pre>
          </div>
        </article>

        {siteConfig.footer.enabled && <Footer />}
      </div>
    </main>
  )
}

