import { categoryInfos } from "./catagoryinfo";
import CategoryCard from "./CategoryCard";
import './cata.css'
function Category() {
  return (
    <section className='category__container'>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.imgLink} data={infos} />
      ))}
    </section>
  );
}

export default Category;
