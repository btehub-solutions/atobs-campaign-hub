import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// We'll use generated placeholder images for the gallery
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop", alt: "Community engagement event" },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop", alt: "Education support program" },
  { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop", alt: "Town hall meeting" },
  { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop", alt: "Youth empowerment workshop" },
  { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop", alt: "Constituency visit" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop", alt: "Campaign rally" },
];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            Photo <span className="text-accent">Gallery</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Moments from community engagements, empowerment programs, and constituency outreach.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="cursor-pointer rounded-xl overflow-hidden aspect-[3/2] border border-border"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <Lightbox
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={galleryImages.map((img) => ({ src: img.src, alt: img.alt }))}
        />
      </div>
    </section>
  );
};

export default Gallery;
