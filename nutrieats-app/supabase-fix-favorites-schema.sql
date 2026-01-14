-- Fix the favorites table to use TEXT for recipe_id instead of UUID
-- This is needed because Sanity uses text IDs like "recipe-1", "recipe-10", etc.

-- Step 1: Drop the foreign key constraint (if it exists)
ALTER TABLE favorites 
DROP CONSTRAINT IF EXISTS favorites_recipe_id_fkey;

-- Step 2: Drop existing policies (they reference the column)
DROP POLICY IF EXISTS "Users can view their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can insert their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can delete their own favorites" ON favorites;

-- Step 3: Drop existing indexes
DROP INDEX IF EXISTS idx_favorites_recipe_id;

-- Step 4: Alter the column type
ALTER TABLE favorites 
ALTER COLUMN recipe_id TYPE TEXT;

-- Step 5: Recreate the index
CREATE INDEX idx_favorites_recipe_id ON favorites(recipe_id);

-- Step 6: Recreate the policies
CREATE POLICY "Users can view their own favorites"
    ON favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
    ON favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
    ON favorites FOR DELETE
    USING (auth.uid() = user_id);
