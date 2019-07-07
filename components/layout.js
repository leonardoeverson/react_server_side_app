import Link from 'next/link'
import Head from 'next/head'

export default ({title}) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />

            <script type="text/plain" src="https://unpkg.com/react/umd/react.production.js"/>

            <script type="text/plain"
                    src="https://unpkg.com/react-dom/umd/react-dom.production.js"
            />

            <script type="text/plain"
                    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
            />

        </Head>
    </div>
);



