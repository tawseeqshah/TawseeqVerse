/*
  # Fix Activities Type Constraint

  1. Changes
    - Update the check constraint for activities.type to properly validate 'books' and 'movies'
    - Add explicit type values to match the frontend code
*/

DO $$ 
BEGIN
  -- Drop existing check constraint if it exists
  ALTER TABLE activities DROP CONSTRAINT IF EXISTS activities_type_check;
  
  -- Add new check constraint with correct values
  ALTER TABLE activities 
    ADD CONSTRAINT activities_type_check 
    CHECK (type IN ('books', 'movies'));
END $$;