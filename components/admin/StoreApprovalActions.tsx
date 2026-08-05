'use client';

import { useState, useTransition } from 'react';
import { Check, X } from 'lucide-react';
import { approveStore, rejectStore } from '@/app/admin/lojas/actions';

export function StoreApprovalActions({ storeId }: { storeId: string }) {
  const [isPending, startTransition] = useTransition();
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [reason, setReason] = useState('');

  function handleApprove() {
    if (!confirm('Aprovar esta loja? Ela vai ficar visível publicamente.')) return;
    startTransition(() => {
      approveStore(storeId);
    });
  }

  function handleReject() {
    startTransition(() => {
      rejectStore(storeId, reason);
    });
  }

  if (showRejectForm) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Motivo da rejeição (opcional)"
          className="form-input text-[13px]"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReject}
            disabled={isPending}
            className="rounded-full bg-red-600 px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-60"
          >
            Confirmar rejeição
          </button>
          <button
            type="button"
            onClick={() => setShowRejectForm(false)}
            className="rounded-full border border-sand px-4 py-2 text-[13px] font-semibold text-ink-soft"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleApprove}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-full bg-pine px-4 py-2 text-[13px] font-semibold text-bg disabled:opacity-60"
      >
        <Check size={14} />
        Aprovar
      </button>
      <button
        type="button"
        onClick={() => setShowRejectForm(true)}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-full border border-sand px-4 py-2 text-[13px] font-semibold text-ink-soft hover:border-red-400 hover:text-red-600 disabled:opacity-60"
      >
        <X size={14} />
        Rejeitar
      </button>
    </div>
  );
}