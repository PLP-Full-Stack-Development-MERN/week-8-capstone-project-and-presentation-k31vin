
// Dummy resources data
const resources = [
  {
    id: "r1",
    title: "Essential Nutrients During Pregnancy",
    category: "Pregnancy Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    content: `
      <h2>Essential Nutrients for a Healthy Pregnancy</h2>
      <p>Proper nutrition during pregnancy is crucial for both the mother and the developing baby. Here are the key nutrients you should focus on:</p>
      
      <h3>Folate/Folic Acid</h3>
      <p>Folate is critical in the early stages of pregnancy to prevent neural tube defects. Aim for 600-800 mcg daily through diet and supplements.</p>
      <p>Food sources: leafy greens, citrus fruits, beans, and fortified grains.</p>
      
      <h3>Iron</h3>
      <p>Iron requirements almost double during pregnancy to support increased blood volume and the baby's development. Many women need supplements in addition to dietary sources.</p>
      <p>Food sources: lean red meat, poultry, fish, beans, and fortified cereals.</p>
      
      <h3>Calcium</h3>
      <p>Calcium supports the development of your baby's bones, teeth, heart, and muscles. If you don't get enough, your body will take calcium from your bones to give to the baby.</p>
      <p>Food sources: dairy products, fortified plant milks, leafy greens, and calcium-set tofu.</p>
      
      <h3>Omega-3 Fatty Acids (DHA)</h3>
      <p>DHA is important for your baby's brain and eye development. Aim for 2-3 servings of low-mercury fish per week, or consider a supplement if you don't eat fish.</p>
      <p>Food sources: fatty fish like salmon, sardines, and trout, as well as DHA-enriched eggs.</p>
    `,
    author: "Dr. Sarah Johnson",
    publishDate: "2025-03-15"
  },
  {
    id: "r2",
    title: "Managing Morning Sickness with Diet",
    category: "Pregnancy Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    content: `
      <h2>Dietary Strategies to Manage Morning Sickness</h2>
      <p>Morning sickness affects up to 80% of pregnant women. While it can't always be completely eliminated, these dietary strategies may help reduce its severity:</p>
      
      <h3>Eat Small, Frequent Meals</h3>
      <p>An empty stomach can trigger nausea. Try eating 5-6 small meals throughout the day instead of 3 large ones.</p>
      
      <h3>Choose Bland, Starchy Foods</h3>
      <p>Foods like plain crackers, toast, and rice are often better tolerated. Keep some crackers by your bed to eat before getting up in the morning.</p>
      
      <h3>Stay Hydrated</h3>
      <p>Sip water throughout the day. If plain water is unappealing, try adding a slice of lemon, or opt for ginger tea which may also help reduce nausea.</p>
      
      <h3>Consider Vitamin B6</h3>
      <p>Some studies suggest vitamin B6 supplements may help reduce nausea. Speak with your healthcare provider before taking any supplements.</p>
      
      <h3>Foods That May Help</h3>
      <ul>
        <li>Ginger (tea, candies, or capsules)</li>
        <li>Cold foods (which have less aroma)</li>
        <li>Protein-rich snacks</li>
        <li>Lemon water or lemonade</li>
        <li>Peppermint tea</li>
      </ul>
      
      <h3>Foods to Avoid</h3>
      <ul>
        <li>Fatty, greasy foods</li>
        <li>Spicy foods</li>
        <li>Foods with strong smells</li>
        <li>Very sweet foods</li>
      </ul>
    `,
    author: "Dr. Emily Wilson",
    publishDate: "2025-02-28"
  },
  {
    id: "r3",
    title: "Healthy Meal Planning for Gestational Diabetes",
    category: "Health Conditions",
    imageUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    content: `
      <h2>Managing Gestational Diabetes Through Diet</h2>
      <p>Gestational diabetes requires careful attention to diet to maintain healthy blood sugar levels. Here's how to create a balanced meal plan:</p>
      
      <h3>The Basics of Carbohydrate Counting</h3>
      <p>Learn to identify which foods contain carbohydrates and how they affect your blood sugar. Work with your healthcare provider to determine how many carbs you should eat at each meal and snack.</p>
      
      <h3>Choose Complex Carbohydrates</h3>
      <p>Opt for whole grains, legumes, and vegetables over refined carbs. These contain fiber which helps slow the absorption of sugar into your bloodstream.</p>
      
      <h3>Pair Carbs with Protein and Healthy Fats</h3>
      <p>Including protein and healthy fats with carbohydrates slows digestion and helps prevent blood sugar spikes.</p>
      
      <h3>Sample Meal Plan</h3>
      <p><strong>Breakfast:</strong> 1/2 cup steel-cut oatmeal with 1 tablespoon almond butter and 1/4 cup berries</p>
      <p><strong>Morning Snack:</strong> 1 small apple with 1 string cheese</p>
      <p><strong>Lunch:</strong> Large salad with 4 oz grilled chicken, 1/2 cup chickpeas, vegetables, and olive oil dressing</p>
      <p><strong>Afternoon Snack:</strong> 1/4 cup hummus with vegetable sticks</p>
      <p><strong>Dinner:</strong> 4 oz baked salmon, 2/3 cup quinoa, and roasted vegetables</p>
      <p><strong>Evening Snack:</strong> 1/4 cup cottage cheese with 2 tablespoons chopped nuts</p>
      
      <h3>Tips for Success</h3>
      <ul>
        <li>Eat regularly throughout the day</li>
        <li>Don't skip meals, especially breakfast</li>
        <li>Keep a food journal to identify which foods cause blood sugar spikes</li>
        <li>Stay hydrated with water</li>
        <li>Include physical activity as recommended by your doctor</li>
      </ul>
    `,
    author: "Dr. Michael Chang",
    publishDate: "2025-03-05"
  },
  {
    id: "r4",
    title: "Postpartum Nutrition for Recovery and Breastfeeding",
    category: "Postpartum Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    content: `
      <h2>Nutrition After Childbirth: Supporting Recovery and Breastfeeding</h2>
      <p>After delivery, your body needs proper nutrition to heal, recover, and produce breast milk if you're breastfeeding. Here's how to nourish yourself during this important time:</p>
      
      <h3>Calorie Needs</h3>
      <p>If you're breastfeeding, you need about 500 extra calories per day above your pre-pregnancy needs. Focus on nutrient-dense foods rather than empty calories.</p>
      
      <h3>Important Nutrients for Recovery</h3>
      <ul>
        <li><strong>Protein:</strong> Essential for tissue repair and healing. Aim for 65-75g daily.</li>
        <li><strong>Iron:</strong> Helps replenish blood loss during delivery. Lean meats, beans, and fortified cereals are good sources.</li>
        <li><strong>Vitamin C:</strong> Assists with iron absorption and wound healing.</li>
        <li><strong>B vitamins:</strong> Support energy levels and mood regulation.</li>
        <li><strong>Calcium:</strong> Necessary for both your bone health and your baby's development.</li>
      </ul>
      
      <h3>Hydration is Key</h3>
      <p>Especially for breastfeeding mothers, staying well-hydrated is crucial. Aim to drink a glass of water each time you breastfeed, plus throughout the day.</p>
      
      <h3>Meal Planning When Time is Limited</h3>
      <p>Prepare simple, nutritious meals that can be eaten with one hand while holding your baby. Stock up on healthy snacks like nuts, cut vegetables, yogurt, and fruit.</p>
      
      <h3>Foods That May Support Milk Production</h3>
      <p>While evidence is largely anecdotal, some foods traditionally believed to boost milk supply include oatmeal, fenugreek, brewer's yeast, and fennel.</p>
      
      <h3>Taking Care of You</h3>
      <p>Don't forget about your own needs. Accept help with meal preparation when offered, and consider batch cooking or meal delivery services during the early weeks.</p>
    `,
    author: "Dr. Jennifer Patel",
    publishDate: "2025-03-20"
  }
];

/**
 * Get all resources
 */
const getAllResources = (req, res) => {
  res.status(200).json(resources);
};

/**
 * Get resources by category
 */
const getResourcesByCategory = (req, res) => {
  const category = req.params.category;
  const categoryResources = resources.filter(resource => 
    resource.category.toLowerCase() === category.toLowerCase()
  );
  
  res.status(200).json(categoryResources);
};

/**
 * Get resource by ID
 */
const getResourceById = (req, res) => {
  const resource = resources.find(r => r.id === req.params.id);
  
  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  }
  
  res.status(200).json(resource);
};

module.exports = {
  getAllResources,
  getResourcesByCategory,
  getResourceById
};
