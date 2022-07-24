import { Reviews } from "../../shared/types";

export const SortReview = (reviews: Reviews[], type: string = "asc"): any[] => {
  if (type === "asc") {
    return reviews.sort(
      (a, b) => a.author_details.rating - b.author_details.rating
    );
  } else if (type === "desc") {
    return reviews.sort(
      (a, b) => b.author_details.rating - a.author_details.rating
    );
  } else {
    return reviews;
  }
};
