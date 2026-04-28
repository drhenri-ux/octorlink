-- =========================================================
-- Tabela: octorlink_5g_plans
-- =========================================================
CREATE TABLE public.octorlink_5g_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC,
  badge_text TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.octorlink_5g_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Planos 5G ativos são visíveis publicamente"
ON public.octorlink_5g_plans FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins podem ver todos os planos 5G"
ON public.octorlink_5g_plans FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem inserir planos 5G"
ON public.octorlink_5g_plans FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem atualizar planos 5G"
ON public.octorlink_5g_plans FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem deletar planos 5G"
ON public.octorlink_5g_plans FOR DELETE
USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_octorlink_5g_plans_updated_at
BEFORE UPDATE ON public.octorlink_5g_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- Tabela: tracker_plans
-- =========================================================
CREATE TABLE public.tracker_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC,
  badge_text TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tracker_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Planos tracker ativos são visíveis publicamente"
ON public.tracker_plans FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins podem ver todos os planos tracker"
ON public.tracker_plans FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem inserir planos tracker"
ON public.tracker_plans FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem atualizar planos tracker"
ON public.tracker_plans FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem deletar planos tracker"
ON public.tracker_plans FOR DELETE
USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_tracker_plans_updated_at
BEFORE UPDATE ON public.tracker_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- Tabela: turbo_plans
-- =========================================================
CREATE TABLE public.turbo_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC,
  badge_text TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.turbo_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Planos turbo ativos são visíveis publicamente"
ON public.turbo_plans FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins podem ver todos os planos turbo"
ON public.turbo_plans FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem inserir planos turbo"
ON public.turbo_plans FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem atualizar planos turbo"
ON public.turbo_plans FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem deletar planos turbo"
ON public.turbo_plans FOR DELETE
USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_turbo_plans_updated_at
BEFORE UPDATE ON public.turbo_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- Seeds: dados iniciais espelhando o que está hardcoded hoje
-- =========================================================

-- Octorlink 5G+
INSERT INTO public.octorlink_5g_plans (name, price, features, metadata, is_popular, sort_order) VALUES
('Plano 14GB', 59.90, ARRAY['Minutos ilimitados', '100 SMS', 'WhatsApp ilimitado'], '{"data": "14 GB"}'::jsonb, false, 1),
('Plano 21GB', 69.90, ARRAY['Minutos ilimitados', '100 SMS', 'WhatsApp ilimitado'], '{"data": "21 GB"}'::jsonb, false, 2),
('Plano 29GB', 79.90, ARRAY['Minutos ilimitados', '100 SMS', 'WhatsApp ilimitado'], '{"data": "29 GB"}'::jsonb, true, 3),
('Plano 39GB', 89.90, ARRAY['Minutos ilimitados', '100 SMS', 'WhatsApp ilimitado'], '{"data": "39 GB"}'::jsonb, false, 4),
('Plano 44GB', 99.90, ARRAY['Minutos ilimitados', '100 SMS', 'WhatsApp ilimitado'], '{"data": "44 GB"}'::jsonb, false, 5);

-- Turbo
INSERT INTO public.turbo_plans (name, price, features, metadata, is_popular, sort_order) VALUES
('W Móvel 39GB', 69.90, ARRAY['Internet 5G','WhatsApp ilimitado','Gigas acumulados','Isenção de multa','Sem fidelidade'], '{"franquia": "39GB", "base": "29GB + 9GB Bônus", "subtitle": "+100 SMS + 1GB Portabilidade"}'::jsonb, false, 1),
('W Móvel 58GB', 79.90, ARRAY['Internet 5G','WhatsApp ilimitado','Gigas acumulados','Isenção de multa','Sem fidelidade'], '{"franquia": "58GB", "base": "39GB + 19GB Bônus", "subtitle": "+100 SMS + 1GB Portabilidade"}'::jsonb, true, 2),
('W Móvel 68GB', 89.90, ARRAY['Internet 5G','WhatsApp ilimitado','Gigas acumulados','Isenção de multa','Sem fidelidade'], '{"franquia": "68GB", "base": "44GB + 24GB Bônus", "subtitle": "+100 SMS + 1GB Portabilidade"}'::jsonb, false, 3);

-- Tracker (placeholders simples – usuário pode editar)
INSERT INTO public.tracker_plans (name, price, badge_text, features, metadata, is_popular, sort_order) VALUES
('Tracker Básico', 49.90, 'Ideal para 1 veículo', ARRAY['Rastreamento em tempo real','Bloqueio remoto','Histórico de rotas','App mobile'], '{"vehicle_type": "Carro/Moto"}'::jsonb, false, 1),
('Tracker Premium', 79.90, 'Mais escolhido', ARRAY['Tudo do Básico','Cerca eletrônica','Alertas instantâneos','Central 24h','Suporte prioritário'], '{"vehicle_type": "Carro/Moto"}'::jsonb, true, 2),
('Tracker Frota', 0, 'Sob consulta', ARRAY['Gestão de múltiplos veículos','Relatórios avançados','Integração com sistemas','Atendimento dedicado'], '{"vehicle_type": "Frota", "is_consultation": true}'::jsonb, false, 3);
