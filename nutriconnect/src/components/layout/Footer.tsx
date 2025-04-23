import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">NutriConnect</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Personalized nutrition guidance and meal planning for expectant mothers and those with specific health conditions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">
                    Nutrition Articles
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">
                    Pregnancy Nutrition
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">
                    Healthy Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">
                    Dietary Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Subscribe to our newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Get the latest nutrition tips and healthy recipes delivered to your inbox.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:ml-2 sm:mt-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} NutriConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
