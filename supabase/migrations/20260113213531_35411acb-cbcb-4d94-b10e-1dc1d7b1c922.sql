-- Create table for referrals (Indique e Ganhe)
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Dados do titular
  titular_nome TEXT NOT NULL,
  titular_sobrenome TEXT NOT NULL,
  titular_cpf TEXT,
  titular_celular TEXT NOT NULL,
  
  -- Dados do amigo indicado
  amigo_nome TEXT NOT NULL,
  amigo_sobrenome TEXT NOT NULL,
  amigo_celular TEXT NOT NULL,
  
  -- Status da indicação
  status TEXT NOT NULL DEFAULT 'pendente'
);

-- Enable Row Level Security
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode criar uma indicação
CREATE POLICY "Qualquer pessoa pode criar indicação" 
ON public.referrals 
FOR INSERT 
WITH CHECK (true);

-- Apenas admins podem ver indicações
CREATE POLICY "Apenas admins podem ver indicações" 
ON public.referrals 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Apenas admins podem atualizar indicações
CREATE POLICY "Apenas admins podem atualizar indicações" 
ON public.referrals 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Apenas admins podem deletar indicações
CREATE POLICY "Apenas admins podem deletar indicações" 
ON public.referrals 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_referrals_updated_at
BEFORE UPDATE ON public.referrals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();