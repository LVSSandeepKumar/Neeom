import PropTypes from 'prop-types';

export function ReviewsHero({ rating }) {
  // Calculate the number of full stars based on the rating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Logo */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-10"
        style={{
          backgroundImage: "url(/logo-neeom-new.jpg)",
          backgroundSize: "500px 500px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center anim-slide-up">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Client Reviews</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Discover what our clients say about their experience working with NEEOM Designs. Their satisfaction is our
          greatest achievement.
        </p>
        <div className="flex items-center justify-center space-x-2 text-yellow-500">
          {[...Array(fullStars)].map((_, i) => (
            <svg key={`full-${i}`} className="w-8 h-8 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
          {hasHalfStar && (
            <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              <path d="M10 15l5.878 3.09-1.123-6.545L19.511 6.91l-6.572-.955L10 0l-2.939 5.955-6.572.955 4.756 4.635-1.123 6.545z" />
            </svg>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <svg key={`empty-${i}`} className="w-8 h-8 fill-current text-gray-300" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
          <span className="ml-4 text-2xl font-bold text-gray-900">{rating}/5</span>
        </div>
      </div>
    </section>
  );
}

// Define the prop types
ReviewsHero.propTypes = {
  rating: PropTypes.number.isRequired,
};
