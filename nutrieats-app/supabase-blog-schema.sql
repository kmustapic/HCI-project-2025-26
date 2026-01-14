-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL DEFAULT auth.uid(),
    user_name TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    video_url TEXT,
    code_snippet TEXT,
    code_language TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 1. Anyone can see blog posts (Authenticated & Anonymous)
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.blog_posts FOR SELECT 
USING (true);

-- 2. Logged-in users can create their own posts
CREATE POLICY "Users can insert their own posts" 
ON public.blog_posts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 3. Users can delete only their own posts
CREATE POLICY "Users can delete own posts" 
ON public.blog_posts FOR DELETE 
USING (auth.uid() = user_id);

-- 4. Users can update only their own posts (Optional, for future)
CREATE POLICY "Users can update own posts" 
ON public.blog_posts FOR UPDATE 
USING (auth.uid() = user_id);
