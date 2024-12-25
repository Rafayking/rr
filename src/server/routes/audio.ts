import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Upload audio file
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const { data, error } = await supabase.storage
    .from('audio-files')
    .upload(`${Date.now()}-${req.file.originalname}`, req.file.buffer);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Create audio file record
  const { data: audioFile, error: dbError } = await supabase
    .from('audio_files')
    .insert([{
      project_id: req.body.projectId,
      filename: req.file.originalname,
      url: data.path,
      uploaded_by: req.user.id,
    }])
    .select()
    .single();

  if (dbError) {
    return res.status(500).json({ error: dbError.message });
  }

  res.status(201).json(audioFile);
});

export const audioRoutes = router;