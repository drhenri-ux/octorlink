-- Create additional_services table for managing services in admin
CREATE TABLE public.additional_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  icon_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.additional_services ENABLE ROW LEVEL SECURITY;

-- Public can view active services
CREATE POLICY "Serviços ativos são visíveis publicamente" 
ON public.additional_services 
FOR SELECT 
USING (is_active = true);

-- Authenticated users can manage services
CREATE POLICY "Usuários autenticados podem inserir serviços" 
ON public.additional_services 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Usuários autenticados podem atualizar serviços" 
ON public.additional_services 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Usuários autenticados podem deletar serviços" 
ON public.additional_services 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Admin can view all services (including inactive)
CREATE POLICY "Admins podem ver todos os serviços" 
ON public.additional_services 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create trigger for updated_at
CREATE TRIGGER update_additional_services_updated_at
BEFORE UPDATE ON public.additional_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();