-- Adicionar colunas para leads empresariais
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS empresa_nome text,
ADD COLUMN IF NOT EXISTS qtd_dispositivos text,
ADD COLUMN IF NOT EXISTS tipo_lead text DEFAULT 'residencial';