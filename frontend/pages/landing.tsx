import React, { useState } from 'react';

// Declaración global para Paddle
declare global {
  interface Window {
    Paddle?: {
      Checkout: {
        open: (options: any) => void;
      };
    };
  }
}
import { FaCheckCircle, FaRocket, FaLock, FaRobot, FaWhatsapp, FaFacebook, FaInstagram, FaDollarSign } from 'react-icons/fa';

const FEATURES = [
  { icon: <FaRobot color="#4CAF50" />, title: 'IA Avanzada (GPT-4)', desc: 'Responde automáticamente a clientes en WhatsApp, Facebook e Instagram.' },
  { icon: <FaLock color="#2196F3" />, title: 'Control de pagos', desc: 'Bloquea acceso si no se abona la suscripción. Avisos automáticos por email y WhatsApp.' },
  { icon: <FaRocket color="#FF9800" />, title: 'Panel de canales', desc: 'Conecta y gestiona todas tus redes desde un solo lugar.' },
  { icon: <FaDollarSign color="#9C27B0" />, title: 'Oferta especial', desc: 'Antes $60, ahora $33 dólares por tiempo limitado.' },
  { icon: <FaCheckCircle color="#607D8B" />, title: 'Fácil de usar', desc: 'Interfaz intuitiva, configuración rápida y soporte personalizado.' },
];

const FAQ = [
  { q: '¿Qué incluye la app?', a: 'Gestión de ventas, IA para responder clientes, control de pagos, panel de canales, y más.' },
  { q: '¿Puedo probar la app?', a: 'Sí, ofrecemos demo y soporte para que pruebes sin compromiso.' },
  { q: '¿Cómo funciona el pago?', a: 'Suscripción mensual, con aviso antes de vencer y bloqueo automático si no se abona.' },
  { q: '¿Qué redes puedo conectar?', a: 'WhatsApp, Facebook, Instagram y más.' },
];

  const [paid, setPaid] = useState(false);

  // Paddle: abre checkout y callback
  const handlePay = () => {
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        product: process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID,
        successCallback: () => setPaid(true),
      });
    }
  };

  // Si ya pagó, muestra registro

  return (
    <div style={{ fontFamily: 'Orbitron, sans-serif', background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)', minHeight: '100vh' }}>
      <header style={{ background: 'linear-gradient(90deg, #00c6fb 0%, #43e97b 100%)', color: '#fff', padding: '40px 0', textAlign: 'center', borderRadius: '0 0 40px 40px', boxShadow: '0 4px 24px #0f2027' }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, letterSpacing: 2, textShadow: '0 2px 8px #2c5364' }}>¡Oferta Futurista!</h1>
        <p style={{ fontSize: 26, margin: '20px 0', color: '#e0f7fa', fontWeight: 500 }}>La app para ventas multicanal con IA, antes <span style={{ textDecoration: 'line-through', color: '#b2dfdb' }}>$60</span> <b style={{ color: '#43e97b', fontSize: 34, textShadow: '0 1px 4px #00c6fb' }}>$33 dólares</b></p>
        {!paid ? (
          <button
            style={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#0f2027', fontWeight: 900, fontSize: 24, padding: '18px 48px', borderRadius: 30, border: 'none', boxShadow: '0 4px 16px #2c5364', cursor: 'pointer', marginTop: 24, letterSpacing: 1 }}
            onClick={handlePay}
          >Comprar ahora</button>
        ) : (
          <div style={{ marginTop: 24, color: '#43e97b', fontWeight: 700, fontSize: 22 }}>
            ¡Pago realizado con Paddle!<br />
            <span style={{ color: '#00c6fb', fontSize: 20 }}>Crea tu cuenta y accede a la app:</span>
            <a href="/register" style={{ display: 'inline-block', marginTop: 16, background: '#00c6fb', color: '#fff', padding: '12px 32px', borderRadius: 20, fontWeight: 900, fontSize: 20, textDecoration: 'none', boxShadow: '0 2px 8px #2c5364' }}>Crear cuenta</a>
          </div>
        )}
        {/* Incluir script Paddle en _app o _document si no está */}
      </header>
        {/* ...resto del contenido... */}
      <section style={{ maxWidth: 1000, margin: '48px auto', background: 'rgba(255,255,255,0.95)', borderRadius: 24, boxShadow: '0 4px 32px #2c5364', padding: 40 }}>
        <h2 style={{ fontSize: 32, marginBottom: 32, color: '#00c6fb', fontWeight: 800, letterSpacing: 1 }}>¿Qué incluye la app?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'center' }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ width: 240, background: 'linear-gradient(135deg, #e0f7fa 0%, #43e97b 100%)', borderRadius: 16, padding: 28, textAlign: 'center', boxShadow: '0 2px 8px #b2dfdb', marginBottom: 24 }}>
              <div style={{ fontSize: 44, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 10, color: '#0f2027', letterSpacing: 1 }}>{f.title}</div>
              <div style={{ color: '#2c5364', fontSize: 16, fontWeight: 500 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: 1000, margin: '48px auto', background: 'rgba(255,255,255,0.95)', borderRadius: 24, boxShadow: '0 4px 32px #2c5364', padding: 40 }}>
        <h2 style={{ fontSize: 32, marginBottom: 32, color: '#43e97b', fontWeight: 800, letterSpacing: 1 }}>Preguntas frecuentes</h2>
        {FAQ.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 800, fontSize: 19, color: '#00c6fb', letterSpacing: 1 }}>{q}</div>
            <div style={{ color: '#2c5364', fontSize: 16, marginLeft: 10, fontWeight: 500 }}>{a}</div>
          </div>
        ))}
      </section>
      <footer style={{ textAlign: 'center', color: '#b2dfdb', padding: 32, fontSize: 17, fontWeight: 700, letterSpacing: 1, background: 'linear-gradient(90deg, #00c6fb 0%, #43e97b 100%)', borderRadius: '32px 32px 0 0', marginTop: 40 }}>
        <div>App multicanal con IA | Soporte personalizado | Demo disponible</div>
        <div style={{ marginTop: 12 }}>© 2026 TuApp. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
}
