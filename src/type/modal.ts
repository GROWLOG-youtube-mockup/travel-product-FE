import React from 'react';

export interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export interface AgreementModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  fileUrl: string; // md 또는 txt 파일 경로
  boxWidth?: number;
}
