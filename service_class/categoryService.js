const { CategoryRepository } = require('../repositories/categoryRepository');
const Category = require('../classes/category');

class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(categoryData) {
    const { id, category, description, img } = categoryData;

    // Create a new Category object with the request body values
    const categoryObj = new Category(id, category, description, img);

    try {
      await this.categoryRepository.insert(categoryObj);
      return { message: 'Category created successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create category');
    }
  }

  async getCategoryById(id) {
    try {
      const category = await this.categoryRepository.findById(id);
      return category;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get category');
    }
  }

  async updateCategory(categoryData) {
    const { id, category, description, img } = categoryData;

    // Create a new Category object with the request body values
    const categoryObj = new Category(id, category, description, img);

    try {
      await this.categoryRepository.update(categoryObj);
      return { message: 'Category updated successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update category');
    }
  }

  async deleteCategory(id) {
    try {
      await this.categoryRepository.delete(id);
      return { message: 'Category deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete category');
    }
  }
}

module.exports = CategoryService;
