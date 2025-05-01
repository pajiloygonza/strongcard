import React, { useState, useEffect } from "react";
import "./style.css";

const BusinessComponent = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    unp: "",
    website: "",
    city: "",
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number to accept only digits and plus sign
    if (name === "phone" && !/^[\d+]*$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.organizationName) newErrors.organizationName = "Заполните это поле.";
    if (!formData.unp) newErrors.unp = "Заполните это поле.";
    if (!formData.website) newErrors.website = "Заполните это поле.";
    if (!formData.city) newErrors.city = "Заполните это поле.";
    if (!formData.fullName) newErrors.fullName = "Заполните это поле.";
    if (!formData.phone) {
      newErrors.phone = "Заполните это поле.";
    } else if (!/^\+?\d+$/.test(formData.phone)) {
      newErrors.phone = "Телефон должен содержать только цифры и знак '+'.";
    }
    if (!formData.email) {
      newErrors.email = "Заполните это поле.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный E-mail.";
    }
    if (!formData.message) newErrors.message = "Заполните это поле.";
    return newErrors;
  };

  useEffect(() => {
    const validationErrors = validate();
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [validate, setIsFormValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log(formData);
      // Submit the form
    }
  };

  return (
    <div className="business-component">
      <div className="business-component__header">
        <h2>Стать партнером</h2>
      </div>
      <div className="business-component__text">
        <p>
          Вы являетесь юридическим лицом или ИП и хотите стать партнером
          дисконтного клуба <strong>Strong Card</strong>? Пожалуйста, заполните
          предложенную форму, и мы обязательно с вами свяжемся
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className={errors.organizationName ? "error-label" : ""}>
            Название организации
          </label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className={errors.organizationName ? "error-input" : ""}
          />
          {errors.organizationName && <p className="error">{errors.organizationName}</p>}
        </div>
        <div className="form-group">
          <label className={errors.unp ? "error-label" : ""}>УНП</label>
          <input
            type="text"
            name="unp"
            value={formData.unp}
            onChange={handleChange}
            className={errors.unp ? "error-input" : ""}
          />
          {errors.unp && <p className="error">{errors.unp}</p>}
        </div>
        <div className="form-group">
          <label className={errors.website ? "error-label" : ""}>Сайт организации</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className={errors.website ? "error-input" : ""}
          />
          {errors.website && <p className="error">{errors.website}</p>}
        </div>
        <div className="form-group">
          <label className={errors.city ? "error-label" : ""}>Город</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? "error-input" : ""}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label className={errors.fullName ? "error-label" : ""}>ФИО</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? "error-input" : ""}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div className="form-group">
          <label className={errors.phone ? "error-label" : ""}>Контактный телефон</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "error-input" : ""}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label className={errors.email ? "error-label" : ""}>E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className={errors.message ? "error-label" : ""}>Ваше сообщение</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "error-input" : ""}
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <button type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default BusinessComponent;