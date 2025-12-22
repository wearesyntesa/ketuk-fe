"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
}

export default function QRCodeGenerator({ value, size = 200 }: QRCodeGeneratorProps) {
  const t = useTranslations("qrCode");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
      });
    }
  }, [value, size]);

  const downloadQR = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qr-${value}.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} />
      <Button onClick={downloadQR} variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        {t("downloadQRCode")}
      </Button>
    </div>
  );
}
