import { Category } from "@/app/lib/definitions";
import { Card } from "@/components/ui/card";

interface ICategory {
  category: Category;
}

const CategoryCard = ({ category }: ICategory) => {
  return (
    <Card className="p-2">
      <h3 className="font-semibold text-1xl">{category.name}</h3>
    </Card>
  );
};

export default CategoryCard;
