-- Tabela de aplicativos disponíveis
CREATE TABLE public.apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de planos
CREATE TABLE public.plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  speed TEXT NOT NULL,
  price DECIMAL(10,2),
  is_consultation BOOLEAN NOT NULL DEFAULT false,
  features TEXT[] NOT NULL DEFAULT '{}',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de relacionamento planos-apps
CREATE TABLE public.plan_apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID NOT NULL REFERENCES public.plans(id) ON DELETE CASCADE,
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  UNIQUE(plan_id, app_id)
);

-- Habilitar RLS
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_apps ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública (para o site)
CREATE POLICY "Apps são visíveis publicamente" 
ON public.apps 
FOR SELECT 
USING (true);

CREATE POLICY "Planos são visíveis publicamente" 
ON public.plans 
FOR SELECT 
USING (true);

CREATE POLICY "Relação planos-apps é visível publicamente" 
ON public.plan_apps 
FOR SELECT 
USING (true);

-- Políticas de escrita apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem inserir apps" 
ON public.apps 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar apps" 
ON public.apps 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem deletar apps" 
ON public.apps 
FOR DELETE 
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem inserir planos" 
ON public.plans 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar planos" 
ON public.plans 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem deletar planos" 
ON public.plans 
FOR DELETE 
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem inserir relação planos-apps" 
ON public.plan_apps 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem deletar relação planos-apps" 
ON public.plan_apps 
FOR DELETE 
TO authenticated
USING (true);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_plans_updated_at
BEFORE UPDATE ON public.plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket para imagens dos apps
INSERT INTO storage.buckets (id, name, public) VALUES ('app-icons', 'app-icons', true);

-- Políticas de storage
CREATE POLICY "Imagens de apps são públicas" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'app-icons');

CREATE POLICY "Usuários autenticados podem fazer upload de ícones" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'app-icons');

CREATE POLICY "Usuários autenticados podem atualizar ícones" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'app-icons');

CREATE POLICY "Usuários autenticados podem deletar ícones" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'app-icons');