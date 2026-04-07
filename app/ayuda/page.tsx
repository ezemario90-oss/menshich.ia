import React from "react";

const N8nHelp = () => (
  <div style={{ maxWidth: 800, margin: "0 auto", padding: 32 }}>
    <h1>Conecta WhatsApp, Facebook e Instagram a tu cuenta</h1>
    <p>
      Sigue estos pasos para conectar tus redes sociales y automatizar tus mensajes:
    </p>

    <h2>1. WhatsApp Cloud API</h2>
    <ol>
      <li>
        <b>Crea tu app en <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer">Meta for Developers</a></b>
        <ul>
          <li>Haz clic en “Mis apps” &gt; “Crear app” (tipo Negocio).</li>
          <li>Agrega el producto “WhatsApp”.</li>
        </ul>
      </li>
      <li>
        <b>Obtén tus credenciales:</b>
        <ul>
          <li>Phone Number ID</li>
          <li>WhatsApp Business Account ID</li>
          <li>Access Token</li>
        </ul>
      </li>
      <li>
        <b>Agrega la credencial en n8n:</b>
        <ul>
          <li>
            <a href="https://n8n-1-9vdv.onrender.com/credentials" target="_blank" rel="noopener noreferrer">
              Ir a credenciales de n8n
            </a>
          </li>
          <li>Haz clic en “Nueva credencial” &gt; “WhatsApp Cloud API”.</li>
          <li>Pega tus datos y guarda.</li>
        </ul>
      </li>
    </ol>

    <h2>2. Facebook (Messenger o Páginas)</h2>
    <ol>
      <li>
        <b>Crea tu app en Meta for Developers</b> (igual que arriba, pero agrega “Facebook Login” y/o “Messenger”).
      </li>
      <li>
        <b>Configura el OAuth Redirect URI:</b>
        <ul>
          <li>
            En tu app de Facebook, agrega este URI:<br />
            <code>https://n8n-1-9vdv.onrender.com/rest/oauth2-credential/callback</code>
          </li>
        </ul>
      </li>
      <li>
        <b>Agrega la credencial en n8n:</b>
        <ul>
          <li>
            <a href="https://n8n-1-9vdv.onrender.com/credentials" target="_blank" rel="noopener noreferrer">
              Ir a credenciales de n8n
            </a>
          </li>
          <li>Haz clic en “Nueva credencial” &gt; “Facebook Graph API”.</li>
          <li>Pega tu App ID, App Secret y sigue el flujo de autenticación.</li>
        </ul>
      </li>
    </ol>

    <h2>3. Instagram</h2>
    <ol>
      <li>
        <b>Requisitos previos:</b> Tu cuenta debe ser profesional y estar vinculada a una página de Facebook.
      </li>
      <li>
        <b>Crea tu app en Meta for Developers</b> (agrega “Instagram Graph API”).
      </li>
      <li>
        <b>Configura el OAuth Redirect URI:</b>
        <ul>
          <li>
            <code>https://n8n-1-9vdv.onrender.com/rest/oauth2-credential/callback</code>
          </li>
        </ul>
      </li>
      <li>
        <b>Agrega la credencial en n8n:</b>
        <ul>
          <li>
            <a href="https://n8n-1-9vdv.onrender.com/credentials" target="_blank" rel="noopener noreferrer">
              Ir a credenciales de n8n
            </a>
          </li>
          <li>Haz clic en “Nueva credencial” &gt; “Instagram Graph API”.</li>
          <li>Pega tu App ID, App Secret y sigue el flujo de autenticación.</li>
        </ul>
      </li>
    </ol>

    <h2>¿Necesitas ayuda?</h2>
    <p>
      Si tienes dudas, contáctanos o visita nuestra sección de ayuda.<br />
      <a href="mailto:soporte@tusitio.com">soporte@tusitio.com</a>
    </p>
  </div>
);

export default N8nHelp;
