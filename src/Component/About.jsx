import React from 'react';

const About = () => {
    return (
         <section className="bg-gray-200 py-16 px-4 lg:px-0 rounded-3xl mt-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">About CourtConnect</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          CourtConnect is your gateway to hassle-free sports court booking. Whether you're a tennis enthusiast, a badminton champ, or just getting into squash – our club provides premium courts, top-notch facilities, and a welcoming environment for players of all levels.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {/* History */}
          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🏛 Our History</h3>
            <p className="text-gray-600">
              Founded in 2015, CourtConnect started as a small initiative to simplify court booking for local players. Over the years, we’ve grown into a trusted digital platform connecting thousands of members.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🎯 Our Mission</h3>
            <p className="text-gray-600">
              To make court reservations effortless, fair, and fast — while promoting an active lifestyle and fostering a strong community of sports lovers through accessible technology.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🌟 Our Vision</h3>
            <p className="text-gray-600">
              To become the leading digital hub for sports club management in Bangladesh and beyond, by building trust, community, and performance.
            </p>
          </div>
        </div>
      </div>
    </section>
    );
};

export default About;