-- Create a table for site settings
CREATE TABLE public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  indique_ganhe_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO public.site_settings (id, indique_ganhe_visible) VALUES ('main', true);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for the menu visibility)
CREATE POLICY "Anyone can read site settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Allow authenticated users to update (admin only)
CREATE POLICY "Authenticated users can update site settings" 
ON public.site_settings 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();