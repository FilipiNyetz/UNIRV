import { QRCodeSVG  } from 'qrcode.react';

export default function PixPayment({ pixCode }: { pixCode: string }) {
  return (
    <div>
      <h2>Pague com Pix</h2>
      <div style={{ padding: '20px', background: 'white', display: 'inline-block' }}>
        <QRCodeSVG
          value={pixCode}
          size={200}
          level="H"
        />
      </div>
      <p>Escaneie o QR Code com seu app de pagamentos</p>
    </div>
  );
}
