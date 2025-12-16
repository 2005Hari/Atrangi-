const db = require('./db');

const products = [
    {
        id: 1,
        title: "Ethereal Horizons",
        artist: "Sanya Malhotra",
        artistBio: "Fine Arts student specializing in abstract landscapes",
        university: "National Institute of Design (NID), Ahmedabad",
        price: 192000,
        category: "Resin Art",
        image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop",
        description: "A stunning resin art piece capturing the essence of coastal sunsets. Layers of translucent resin create depth and movement.",
        dimensions: "24 x 36 inches",
        materials: "Epoxy resin, acrylic pigments, wood panel",
        inStock: true,
        featured: true,
    },
    {
        id: 2,
        title: "Golden Fracture",
        artist: "Arjun Kapoor",
        artistBio: "Sculpture major exploring the beauty of imperfection",
        university: "Sir J.J. School of Art, Mumbai",
        price: 148000,
        category: "Sculptures",
        image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1000&auto=format&fit=crop",
        description: "Kintsugi-inspired sculpture highlighting the beauty of broken things. Gold leaf accents on ceramic.",
        dimensions: "12 x 12 x 18 inches",
        materials: "Ceramic, Gold leaf, Resin",
        inStock: true,
        featured: true,
    },
    {
        id: 3,
        title: "Silent Void",
        artist: "Isha Nair",
        artistBio: "Contemporary painter focusing on minimalism",
        university: "College of Art, Delhi",
        price: 256000,
        category: "Sketches & Drawings",
        image: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=1000&auto=format&fit=crop",
        description: "Minimalist charcoal drawing exploring negative space and silence. Framed in matte black wood.",
        dimensions: "30 x 40 inches",
        materials: "Charcoal, Cotton paper",
        inStock: true,
        featured: true,
    },
    {
        id: 4,
        title: "Urban Rhythm",
        artist: "Dev Patel",
        artistBio: "Digital artist capturing city life",
        university: "Srishti Institute of Art, Design and Technology",
        price: 76000,
        category: "Home Decor",
        image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop",
        description: "Limited edition print of digital artwork depicting the chaotic beauty of urban life.",
        dimensions: "20 x 20 inches",
        materials: "Archival pigment print",
        inStock: true,
        featured: false,
    },
    {
        id: 5,
        title: "Cerulean Dreams",
        artist: "Sanya Malhotra",
        artistBio: "Fine Arts student specializing in abstract landscapes",
        university: "National Institute of Design (NID), Ahmedabad",
        price: 168000,
        category: "Resin Art",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
        description: "Deep blue resin layers mimicking the ocean depths. A calming piece for any space.",
        dimensions: "24 x 24 inches",
        materials: "Epoxy resin, pigments",
        inStock: true,
        featured: false,
    },
    {
        id: 6,
        title: "Geometric Harmony",
        artist: "Rohan Mehra",
        artistBio: "Architecture student exploring form and structure",
        university: "CEPT University, Ahmedabad",
        price: 96000,
        category: "Mold Art",
        image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000&auto=format&fit=crop",
        description: "Cast concrete relief with geometric patterns. Industrial yet elegant.",
        dimensions: "18 x 18 inches",
        materials: "Concrete, Wood frame",
        inStock: true,
        featured: false,
    },
    {
        id: 7,
        title: "Floral Whisper",
        artist: "Isha Nair",
        artistBio: "Contemporary painter focusing on minimalism",
        university: "College of Art, Delhi",
        price: 224000,
        category: "Sketches & Drawings",
        image: "https://images.unsplash.com/photo-1578320339916-a3810f63613c?q=80&w=1000&auto=format&fit=crop",
        description: "Delicate pencil sketch of wilting flowers, capturing the fragility of nature.",
        dimensions: "16 x 20 inches",
        materials: "Graphite, Paper",
        inStock: true,
        featured: false,
    },
    {
        id: 8,
        title: "Obsidian Flow",
        artist: "Arjun Kapoor",
        artistBio: "Sculpture major exploring the beauty of imperfection",
        university: "Sir J.J. School of Art, Mumbai",
        price: 280000,
        category: "Sculptures",
        image: "https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?q=80&w=1000&auto=format&fit=crop",
        description: "Abstract bronze sculpture with a dark patina. Fluid forms that change from every angle.",
        dimensions: "10 x 10 x 24 inches",
        materials: "Bronze",
        inStock: true,
        featured: false,
    },
];

const artists = [
    {
        id: 1,
        name: "Aarav Patel",
        expertise: "Contemporary Oil Painting",
        university: "Sir J.J. Institute of Applied Art, Mumbai",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
        bio: "Aarav explores the intersection of traditional Indian motifs and modern urban chaos through rich, textured oil paintings. His work often features vibrant colors and complex layering techniques."
    },
    {
        id: 2,
        name: "Zara Khan",
        expertise: "Digital Surrealism",
        university: "National Institute of Design, Ahmedabad",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        bio: "Zara's digital art challenges reality, blending dreamlike imagery with sharp geometric forms. She specializes in creating immersive, otherworldly landscapes that provoke deep contemplation."
    },
    {
        id: 3,
        name: "Vihaan Singh",
        expertise: "Abstract Expressionism",
        university: "College of Art, Delhi",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        bio: "Vihaan uses bold strokes and a monochromatic palette to express raw emotion. His large-scale canvases are a study in movement and energy, often inspired by the bustling streets of Delhi."
    },
    {
        id: 4,
        name: "Ananya Gupta",
        expertise: "Mixed Media Sculpture",
        university: "Kala Bhavana, Visva-Bharati University",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        bio: "Ananya combines found objects with traditional sculpting materials to create thought-provoking pieces about sustainability and memory. Her work invites viewers to reconsider the value of everyday objects."
    },
    {
        id: 5,
        name: "Rohan Das",
        expertise: "Minimalist Photography",
        university: "Srishti Manipal Institute of Art, Design and Technology",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
        bio: "Rohan captures the beauty in simplicity. His black and white photography focuses on light, shadow, and form, turning ordinary scenes into striking geometric compositions."
    },
    {
        id: 6,
        name: "Ishita Sharma",
        expertise: "Traditional Madhubani Art",
        university: "Banaras Hindu University, Faculty of Visual Arts",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
        bio: "Ishita is dedicated to preserving and evolving the ancient art form of Madhubani. She infuses contemporary themes into traditional patterns, creating intricate narratives of modern Indian life."
    }
];

const seed = async () => {
    try {
        await db.connect();

        console.log('Seeding database...');

        // Clear existing data
        await db.products.deleteMany({});
        await db.artists.deleteMany({});

        // Insert new data
        await db.products.insertMany(products);
        await db.artists.insertMany(artists);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed();
