-- SELECT 100 unique print_jobs.
-- Might get 1 image with 3 person, but only get 1 or 2.

SELECT
  images.id as image_id,
  images.filename,
  people.id as person_id, 
  people.facebook,
  people.instagram,
  images.camera_name,
  images.camera_model,
  images.lens_model,
  images.exposure_time,
  images.aperture,
  images.iso,
  images.shot_focal_length,
  images.flash,
  images.datetime_original,
  images.image_url
FROM print_jobs
JOIN images ON print_jobs.image_id = images.id
JOIN people ON print_jobs.person_id = people.id
LIMIT 100

-- SELECT 100 unique images
-- If 1 image has 3 people, 3 people will always come together.

SELECT
    images.id AS image_id,
    images.filename,
    people.id AS person_id,
    people.facebook,
    people.instagram,
    images.camera_name,
    images.camera_model,
    images.lens_model,
    images.exposure_time,
    images.aperture,
    images.iso,
    images.shot_focal_length,
    images.flash,
    images.datetime_original,
    images.image_url
FROM (
    SELECT *
    FROM images
    ORDER BY RANDOM()
    LIMIT 100
) AS images
JOIN print_jobs ON print_jobs.image_id = images.id
JOIN people ON print_jobs.person_id = people.id
