-- Criar tabela de leads para o CRM
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Status do CRM: interessado, proposta_enviada, cliente
  status TEXT NOT NULL DEFAULT 'interessado',
  
  -- Etapa 1: Dados pessoais
  nome_completo TEXT NOT NULL,
  telefone TEXT NOT NULL,
  
  -- Etapa 2: Endereço
  cep TEXT,
  endereco TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  
  -- Etapa 3: Serviços selecionados
  plano_selecionado TEXT,
  servicos_adicionais TEXT[] DEFAULT '{}',
  
  -- Etapa 4: Documentos
  cpf_cnpj TEXT,
  rg TEXT,
  data_nascimento TEXT,
  nome_mae TEXT,
  email TEXT,
  dia_vencimento TEXT,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política para inserção pública (formulário do site)
CREATE POLICY "Qualquer pessoa pode criar lead"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Política para leitura apenas usuários autenticados (admin)
CREATE POLICY "Apenas admins podem ver leads"
ON public.leads
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Política para atualização apenas usuários autenticados (admin)
CREATE POLICY "Apenas admins podem atualizar leads"
ON public.leads
FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Política para deleção apenas usuários autenticados (admin)
CREATE POLICY "Apenas admins podem deletar leads"
ON public.leads
FOR DELETE
USING (auth.uid() IS NOT NULL);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();