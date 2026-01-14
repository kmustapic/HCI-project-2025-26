
const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: 'cpf6s63u',
    dataset: 'production',
    token: 'skrnUxPIwKHEG2cjiQ83EbH9hMzbXiyvpS2Ds7bH77OF1vhxtkySAv7CSgEDWrOEgihKk0co8i1QZECPiVU2yo8qeXWAWZ1m4t9d6gKkkI1JDbHll3BDXTsT22wRULWhIeXcn8tAObcZ5NMfjS8uuu9C059wdAj7XLjnDNObtEbUSxm9eFT4',
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function debug() {
    const query = '*[_type == "recipe"]{_id, name, "assetUrl": image.asset->url}';
    const data = await client.fetch(query);

    console.log(`\n--- Recipe Image Analysis ---`);
    data.sort((a, b) => {
        const idA = parseInt(a._id.split('-')[1]) || 0;
        const idB = parseInt(b._id.split('-')[1]) || 0;
        return idA - idB;
    }).forEach(r => {
        console.log(`[${r._id}] ${r.name}: ${r.assetUrl || 'MISSING IMAGE'}`);
    });
    console.log(`-----------------------------\n`);
}

debug();
