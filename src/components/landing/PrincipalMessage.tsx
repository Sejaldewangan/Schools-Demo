
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const PrincipalMessage = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-50 skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gold-400 rounded-2xl translate-x-4 translate-y-4" />
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
              alt="Principal"
              className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-6 left-6 right-6 glass-white p-4 rounded-xl">
              <h3 className="font-bold text-navy-900">Dr. Robert Chen</h3>
              <p className="text-sm text-navy-600">Principal, EPS School</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Quote className="w-12 h-12 text-gold-300 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 font-display mb-6">
              Empowering Minds,<br />Transforming Lives
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Education is not merely about accumulating facts; it is about awakening curiosity, fostering empathy, and building the resilience needed to navigate an ever-changing world.
              </p>
              <p>
                At EPS School, we believe that every student possesses unique potential. Our dedicated faculty works tirelessly to create an environment where that potential can blossom. We strive to develop not just scholars, but compassionate leaders and responsible global citizens.
              </p>
              <p>
                I invite you to explore our vibrant campus and experience the EPS difference firsthand. Together, let us shape a brighter future for the next generation.
              </p>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center gap-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_Robert_Chen.png" 
                alt="Signature" 
                className="h-12 opacity-50"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <div>
                <div className="font-bold text-navy-900 font-display text-xl">Dr. Robert Chen</div>
                <div className="text-sm text-gold-600 font-semibold">Ph.D. in Educational Leadership</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;
