import React from 'react';
import {
  ArrowRight, CalendarDays, CheckCircle2, Clock3, Heart, PawPrint,
  Scissors, ShieldCheck, Sparkles, Star, Tag
} from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { store } from '../../services/store';
import { formatVND } from '../../utils/bookingEngine';

interface LandingPageProps {
  onNavigateToBooking: (serviceId?: string) => void;
  onNavigateToServices: () => void;
  onNavigateToPets: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToBooking,
  onNavigateToServices,
  onNavigateToPets
}) => {
  const services = store.getServices(true).slice(0, 3);
  const reviews = store.getReviews().slice(0, 3);
  const coupons = store.getCoupons().filter((coupon) => coupon.is_active).slice(0, 2);

  return (
    <div className="pet-landing-page">
      <section className="pet-hero-section">
        <div className="pet-hero-backdrop" aria-hidden="true" />
        <div className="pet-hero-mascots" aria-hidden="true"><img src={ASSETS.heroPair} alt="" /></div>
        <div className="pet-hero-copy">
          <span className="pet-eyebrow"><Sparkles size={15} /> A HAPPY PLACE FOR YOUR LOVELY PETS</span>
          <h1>Yêu thương bé cưng<br /><em>bằng cả trái tim!</em></h1>
          <p>Chăm sóc tận tâm – Trải nghiệm dễ thương – Đồng hành cùng mọi khoảnh khắc của bé.</p>
          <div className="pet-hero-actions">
            <button className="pet-button pet-button-primary" onClick={() => onNavigateToBooking()}><CalendarDays size={19} /> Đặt lịch ngay</button>
            <button className="pet-button pet-button-light" onClick={onNavigateToServices}><Scissors size={19} /> Khám phá dịch vụ</button>
          </div>
          {coupons.length > 0 && (
            <div className="pet-coupon-row">
              {coupons.map((coupon) => <span key={coupon.id}><Tag size={14} /><b>{coupon.code}</b> · {coupon.description}</span>)}
            </div>
          )}
          <div className="pet-hero-trust">
            <span><ShieldCheck size={17} /> Chăm sóc tận tâm</span>
            <span><Clock3 size={17} /> Đặt lịch linh hoạt</span>
            <span><Heart size={17} /> Yêu thương từng bé</span>
          </div>
        </div>
        <div className="pet-hero-scroll">Khám phá Pet Phết <span>↓</span></div>
      </section>

      <section className="pet-welcome-strip">
        <div className="pet-welcome-copy">
          <span className="pet-section-kicker">PET PHẾT – PET FIRST</span>
          <h2>Mỗi bé cưng đều xứng đáng được chăm sóc bằng sự dịu dàng.</h2>
          <p>Từ tắm spa, cắt tỉa đến thăm khám và tiêm phòng, Pet Phết giúp bạn quản lý hành trình chăm sóc bé trong một nơi duy nhất.</p>
          <button className="pet-text-link" onClick={onNavigateToPets}>Tạo hồ sơ cho bé <ArrowRight size={17} /></button>
        </div>
        <div className="pet-mascot-card">
          <img src={ASSETS.bgBanner} alt="Cún Phết và Mèo Bông" />
          <div><strong>Cún Phết & Mèo Bông</strong><span>Hai người bạn đồng hành của Pet Phết</span></div>
        </div>
      </section>

      <section className="pet-quick-benefits">
        <article><span className="benefit-icon orange"><PawPrint /></span><div><strong>Hồ sơ riêng cho từng bé</strong><small>Lưu cân nặng, thông tin và lịch sử chăm sóc.</small></div></article>
        <article><span className="benefit-icon teal"><CalendarDays /></span><div><strong>Đặt lịch chủ động</strong><small>Chọn ngày, khung giờ còn chỗ và dịch vụ phù hợp.</small></div></article>
        <article><span className="benefit-icon yellow"><Star /></span><div><strong>Nhận Pet Point</strong><small>Nhận 1.000 điểm khi gửi đánh giá hợp lệ.</small></div></article>
      </section>

      <section className="pet-section-block">
        <div className="pet-section-heading">
          <div><span className="pet-section-kicker">DỊCH VỤ NỔI BẬT</span><h2>Chăm sóc bé từ A đến Z</h2><p>Lựa chọn dịch vụ phù hợp với nhu cầu của thú cưng.</p></div>
          <button className="pet-outline-link" onClick={onNavigateToServices}>Xem tất cả dịch vụ <ArrowRight size={16} /></button>
        </div>
        <div className="pet-service-grid">
          {services.map((service, index) => (
            <article className="pet-service-card" key={service.id}>
              <div className="pet-service-image-wrap"><img src={service.image_url} alt={service.service_name} loading="lazy" /><span>{index === 0 ? 'Được yêu thích' : service.duration_minutes + ' phút'}</span></div>
              <div className="pet-service-card-body">
                <div className="pet-service-meta"><span>{service.is_weight_based ? 'Giá theo cân nặng' : 'Giá niêm yết'}</span><span>{service.rating_count > 0 ? <><Star size={13} fill="currentColor" /> {service.rating_avg.toFixed(1)} ({service.rating_count})</> : 'Chưa có đánh giá'}</span></div>
                <h3>{service.service_name}</h3>
                <p>{service.description}</p>
                <div className="pet-service-card-footer"><strong>{service.is_weight_based ? 'Từ ' : ''}{formatVND(service.base_price)}</strong><button onClick={() => onNavigateToBooking(service.id)} aria-label={`Đặt lịch ${service.service_name}`}><ArrowRight size={18} /></button></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pet-how-it-works" className="pet-how-it-works">
        <div className="pet-section-heading centered"><div><span className="pet-section-kicker">ĐẶT LỊCH THẬT DỄ DÀNG</span><h2>Chỉ 4 bước để bé được chăm sóc</h2></div></div>
        <div className="pet-steps-grid">
          {[
            ['01', 'Chọn dịch vụ', 'Tìm hiểu dịch vụ phù hợp với bé cưng.'],
            ['02', 'Chọn thú cưng', 'Sử dụng hồ sơ bé đã lưu hoặc tạo mới.'],
            ['03', 'Chọn thời gian', 'Chọn ngày và khung giờ còn sức chứa.'],
            ['04', 'Xác nhận đặt lịch', 'Kiểm tra thông tin và chọn COD hoặc QR.']
          ].map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
        <div className="pet-center-action"><button className="pet-button pet-button-primary" onClick={() => onNavigateToBooking()}>Bắt đầu đặt lịch <ArrowRight size={18} /></button></div>
      </section>

      <section className="pet-review-section">
        <div className="pet-section-heading"><div><span className="pet-section-kicker">CHIA SẺ TỪ KHÁCH HÀNG</span><h2>Những chiếc đuôi vui vẻ</h2><p>Đánh giá được ghi nhận từ các lịch hẹn đã hoàn thành.</p></div></div>
        {reviews.length > 0 ? <div className="pet-review-grid">{reviews.map((review) => <article key={review.id} className="pet-review-card"><div className="pet-review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div><p>“{review.comment}”</p><strong>{review.user_name}</strong><small>Chủ bé {review.pet_name}</small>{review.admin_reply && <div className="pet-review-reply"><b>Pet Phết phản hồi:</b> {review.admin_reply}</div>}</article>)}</div> : <div className="pet-empty-reviews"><Sparkles /> Pet Phết đang chờ những chia sẻ đầu tiên từ bạn.</div>}
      </section>

      <section className="pet-bottom-cta">
        <div><span className="pet-section-kicker">SẴN SÀNG CHO MỘT NGÀY THẬT VUI?</span><h2>Bé cưng đang chờ một buổi chăm sóc thật chill!</h2><p>Tạo hồ sơ, chọn dịch vụ và đặt lịch cùng Pet Phết nhé.</p></div>
        <button className="pet-button pet-button-white" onClick={() => onNavigateToBooking()}>Đặt lịch cho bé <ArrowRight size={18} /></button>
      </section>
    </div>
  );
};
