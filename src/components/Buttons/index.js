import React from "react";
import "./style.css";
import arrowRight from "../../assets/img/arrow-left-5-svgrepo-com.svg";

export const Buttons = ({ onPageChange, currentPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return pages;
    }

    if (currentPage <= 3) {
      return pages.slice(0, 5);
    }

    if (currentPage >= totalPages - 2) {
      return pages.slice(totalPages - 5);
    }

    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="buttons__conteiner">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="buttons-first_button"
      >
        <img src={arrowRight} alt="Previous page" className="card-arrow__left" />
      </button>
      {visiblePages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            className={`buttons-page_button ${isActive ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="buttons-last_button"
      >
        <img src={arrowRight} alt="Next page" className="card-arrow__right" />
      </button>
    </div>
  );
};

export default Buttons;