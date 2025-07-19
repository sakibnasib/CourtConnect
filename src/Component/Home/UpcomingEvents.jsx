import { motion } from "framer-motion";
import { FaCalendarAlt, FaTrophy, FaUsers } from "react-icons/fa";

const events = [
  {
    title: "Interclub Badminton Tournament",
    date: "Aug 18, 2025",
    description: "Compete with the best players and win exciting prizes.",
    icon: <FaTrophy size={24} className="text-blue-600" />,
  },
  {
    title: "Monthly Fitness Challenge",
    date: "Aug 25, 2025",
    description: "Join our community in a fun and active fitness challenge.",
    icon: <FaUsers size={24} className="text-blue-600" />,
  },
  {
    title: "Open Tennis Court Night",
    date: "Sept 2, 2025",
    description: "Play freely and network with other members.",
    icon: <FaCalendarAlt size={24} className="text-blue-600" />,
  },
];

const UpcomingEvents = () => {
  return (
    <section className="bg-gray-200 py-16 mt-10 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
          Upcoming <span className="">Events</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                {event.icon}
                <h3 className="ml-3 text-xl font-semibold">{event.title}</h3>
              </div>
              <p className="text-gray-500 text-sm mb-2">{event.date}</p>
              <p className="text-gray-700 text-sm">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
