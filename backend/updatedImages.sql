-- Update Images
UPDATE idols
SET 
    image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/250111_aespa_Giselle_02.jpg/960px-250111_aespa_Giselle_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail'
WHERE stage_name = 'Giselle';

UPDATE idols
SET 
    image_url = 'https://static.wikia.nocookie.net/aespa/images/1/1b/Hot_Mess_Teaser_1_Winter_%285%29.jpg/revision/latest/scale-to-width/360?cb=20240610104410'
WHERE stage_name = 'Winter';

UPDATE idols 
SET 
    image_url = 'https://xonomax.com/cdn/shop/files/752127.jpg?v=1729694722'
WHERE stage_name = 'Yuna';

UPDATE idols 
SET 
    image_url = 'https://m.media-amazon.com/images/M/MV5BYjE1MWFjNWEtODI0Ny00Mjc3LWJiOTEtM2JhODE0MDEzYTdiXkEyXkFqcGc@._V1_.jpg'
WHERE stage_name = 'V';

UPDATE idols 
SET 
    image_url = 'https://image.static.bstage.in/cdn-cgi/image/metadata=none,dpr=2,f=auto,width=380,height=380/ateez/17608689-cff7-4f0e-a48b-a3b2d0a91b7f/60bb8d7b-6e02-487d-8fec-1b251d3855a2/ori.jpg'
WHERE stage_name = 'Yeosang';

-- Updating User Table
DELETE FROM users
WHERE id = 1;

TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE favorites, users RESTART IDENTITY;