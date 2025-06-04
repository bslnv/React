import React from 'react';

const AboutPage = () => {
  const pageStyle = {
    padding: '20px',
    color: 'var(--text-color)',
    borderRadius: '8px',
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto'
  };
  const headingStyle = {
    borderBottom: '2px solid var(--fishing-spot-border)',
    paddingBottom: '10px',
    marginBottom: '20px'
  };

  return (
    <div style={pageStyle}>
      <h2 style={headingStyle}>Про Симулятор Риболовлі</h2>
      <p>
        Ласкаво просимо до нашого захоплюючого симулятора риболовлі! Тут ви можете випробувати свою удачу та майстерність,
        ловлячи різноманітну рибу в мальовничих місцях.
      </p>
      <p>
        Кожен рибалка веде свій журнал улову, намагаючись спіймати найбільшу або найрідкіснішу рибу.
        Слідкуйте за оновленнями, адже ми плануємо додавати нові локації, види риб та ігрові механіки!
      </p>
      <p><strong>Основні можливості:</strong></p>
      <ul>
        <li>Різноманітні місця для риболовлі з унікальними наборами риб.</li>
        <li>Збереження прогресу улову в localStorage.</li>
        <li>Система нотифікацій про важливі події.</li>
        <li>Адаптивний дизайн зі зміною теми (світла/темна).</li>
        <li>(Незабаром) Енциклопедія риб з детальною інформацією.</li>
      </ul>
      <p>Дякуємо, що граєте з нами! Вдалої риболовлі!</p>
    </div>
  );
};

export default AboutPage;