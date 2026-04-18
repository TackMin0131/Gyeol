import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "특정상거래법 표시 | 結 GYEOL",
  description: "特定商取引法に基づく表記 / 특정상거래법에 따른 표시",
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ font: "700 15px/1.5 var(--sans)", color: "var(--dp)", margin: "44px 0 12px", letterSpacing: -0.2 }}>{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ font: "400 13px/1.9 var(--sans)", color: "var(--ds)", margin: "0 0 10px", whiteSpace: "pre-line" }}>{children}</p>
);
const Rule = () => <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.08)", margin: "64px 0 40px" }} />;

const cellLabel: React.CSSProperties = {
  font: "600 12px/1.6 var(--sans)",
  color: "var(--dp)",
  padding: "14px 16px",
  verticalAlign: "top",
  width: 160,
  borderBottom: "1px solid rgba(255,255,255,.06)",
  background: "rgba(255,255,255,.02)",
};
const cellValue: React.CSSProperties = {
  font: "400 13px/1.75 var(--sans)",
  color: "var(--ds)",
  padding: "14px 16px",
  verticalAlign: "top",
  borderBottom: "1px solid rgba(255,255,255,.06)",
  whiteSpace: "pre-line",
};

export default function CommercePage() {
  return (
    <article>
      <div style={{ font: "600 11px/1 var(--eng)", letterSpacing: 3, color: "var(--dt)", textTransform: "uppercase", marginBottom: 10 }}>
        Commercial Transactions
      </div>
      <h1 style={{ font: "300 30px/1.3 var(--serif)", color: "var(--dp)", marginBottom: 8, letterSpacing: -0.8 }}>
        특정상거래법 표시
      </h1>
      <div style={{ font: "400 12px/1.6 var(--sans)", color: "var(--dt)", marginBottom: 36 }}>
        시행일 2026. 1. 1. · 최종 개정 2026. 4. 18.
      </div>

      <P>
        본 페이지는 대한민국 「전자상거래 등에서의 소비자보호에 관한 법률」 및 일본국 「特定商取引に関する法律」에 따른
        사업자 정보 및 거래 조건을 표시합니다. 본 서비스는 현재 정식 서비스 개시 이전의 사전등록 단계이며,
        유료 서비스 개시 시점부터 결제·환불 등 거래 조건이 적용됩니다.
      </P>

      <H2>사업자 정보</H2>
      <div style={{ border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={cellLabel}>상호</th>
              <td style={cellValue}>결 (GYEOL)</td>
            </tr>
            <tr>
              <th style={cellLabel}>대표자</th>
              <td style={cellValue}>김택민</td>
            </tr>
            <tr>
              <th style={cellLabel}>사업자등록번호</th>
              <td style={cellValue}>493-14-02639</td>
            </tr>
            <tr>
              <th style={cellLabel}>통신판매업 신고번호</th>
              <td style={cellValue}>정식 서비스 개시 전 신고 예정</td>
            </tr>
            <tr>
              <th style={cellLabel}>국제결혼중개업 신고</th>
              <td style={cellValue}>정식 서비스 개시 전 신고 예정{"\n"}대한민국 「결혼중개업의 관리에 관한 법률」 제4조에 따른 신고 준비 중</td>
            </tr>
            <tr>
              <th style={cellLabel}>주소</th>
              <td style={cellValue}>경기도 광명시 성채로 37</td>
            </tr>
            <tr>
              <th style={cellLabel}>이메일</th>
              <td style={cellValue}>skyty0131@gmail.com</td>
            </tr>
            <tr>
              <th style={cellLabel}>문의 응대 시간</th>
              <td style={cellValue}>평일 10:00 – 18:00 (KST){"\n"}주말·공휴일 휴무</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>서비스 및 거래 조건</H2>
      <div style={{ border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={cellLabel}>서비스 내용</th>
              <td style={cellValue}>한국 남성과 일본 여성을 대상으로 한 국제 결혼정보 중개 서비스(온라인 프로필 매칭, 상담, 만남 주선 등)</td>
            </tr>
            <tr>
              <th style={cellLabel}>이용 요금</th>
              <td style={cellValue}>정식 서비스 개시 시점에 요금 정책을 별도 공지합니다.{"\n"}사전등록 단계에서는 요금이 부과되지 않습니다.</td>
            </tr>
            <tr>
              <th style={cellLabel}>이용 요금 외 부담</th>
              <td style={cellValue}>인터넷 접속료, 통신비 등은 이용자 부담</td>
            </tr>
            <tr>
              <th style={cellLabel}>결제 수단</th>
              <td style={cellValue}>신용카드, 체크카드, 계좌이체, 간편결제 등 (정식 서비스 개시 시 확정)</td>
            </tr>
            <tr>
              <th style={cellLabel}>결제 시기</th>
              <td style={cellValue}>각 상품 주문 시 즉시 결제</td>
            </tr>
            <tr>
              <th style={cellLabel}>서비스 제공 시기</th>
              <td style={cellValue}>결제 완료 후 즉시 이용 가능 (단, 별도 명시된 상품은 명시된 시점에 제공)</td>
            </tr>
            <tr>
              <th style={cellLabel}>청약철회 및 환불</th>
              <td style={cellValue}>대한민국 「전자상거래법」 제17조 및 「결혼중개업의 관리에 관한 법률」에 따라 계약 체결일로부터 14일 이내 청약철회가 가능합니다.{"\n"}단, 이미 제공된 서비스 부분에 대해서는 그 가액을 공제할 수 있으며, 디지털 콘텐츠의 경우 제공이 개시된 이후에는 청약철회가 제한될 수 있습니다.</td>
            </tr>
            <tr>
              <th style={cellLabel}>계약 해지</th>
              <td style={cellValue}>회원은 언제든지 회원 탈퇴 및 계약 해지를 요청할 수 있으며, 회사는 관련 법령에 따라 이용 기간에 비례하여 환불합니다.</td>
            </tr>
            <tr>
              <th style={cellLabel}>동작 환경</th>
              <td style={cellValue}>최신 버전의 Chrome, Safari, Edge, Firefox 브라우저{"\n"}iOS 15 이상, Android 10 이상</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>소비자 피해 구제</H2>
      <P>
        서비스 이용 과정에서 발생하는 불만이나 분쟁은 위 이메일로 접수해 주시기 바랍니다.
        회사와의 협의로 해결이 어려운 경우, 대한민국 소비자분쟁조정위원회(www.ccn.go.kr), 한국소비자원(www.kca.go.kr),
        전자거래분쟁조정위원회(www.ecmc.or.kr) 등에 분쟁 조정을 신청할 수 있습니다.
      </P>

      <Rule />

      {/* JAPANESE */}
      <div style={{ font: "600 11px/1 var(--eng)", letterSpacing: 3, color: "var(--dt)", textTransform: "uppercase", marginBottom: 10 }}>
        日本語版
      </div>
      <h1 style={{ font: "300 26px/1.3 var(--serif)", color: "var(--dp)", marginBottom: 8, letterSpacing: -0.5 }}>
        特定商取引法に基づく表記
      </h1>
      <div style={{ font: "400 12px/1.6 var(--sans)", color: "var(--dt)", marginBottom: 32 }}>
        施行日 2026年1月1日 · 最終改定 2026年4月18日
      </div>

      <P>
        本ページは、日本国「特定商取引に関する法律」および大韓民国「電子商取引等における消費者保護に関する法律」に基づく事業者情報および取引条件を表示するものです。
        本サービスは現在、正式サービス開始前の事前登録段階であり、正式サービス開始時点より決済・返金等の取引条件が適用されます。
      </P>

      <H2>事業者情報</H2>
      <div style={{ border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={cellLabel}>販売業者</th>
              <td style={cellValue}>結 (GYEOL)</td>
            </tr>
            <tr>
              <th style={cellLabel}>運営責任者</th>
              <td style={cellValue}>キム・テクミン</td>
            </tr>
            <tr>
              <th style={cellLabel}>事業者登録番号</th>
              <td style={cellValue}>493-14-02639</td>
            </tr>
            <tr>
              <th style={cellLabel}>所在地</th>
              <td style={cellValue}>大韓民国 京畿道 光明市 城菜路37</td>
            </tr>
            <tr>
              <th style={cellLabel}>連絡先</th>
              <td style={cellValue}>skyty0131@gmail.com{"\n"}※メールでのお問い合わせのみ受け付けております</td>
            </tr>
            <tr>
              <th style={cellLabel}>問い合わせ対応時間</th>
              <td style={cellValue}>平日 10:00 – 18:00 (KST / JST){"\n"}土日祝日休業</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>サービスおよび取引条件</H2>
      <div style={{ border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={cellLabel}>サービス内容</th>
              <td style={cellValue}>韓国人男性と日本人女性を対象とした国際結婚情報仲介サービス(オンラインプロフィールマッチング、相談、お引き合わせ等)</td>
            </tr>
            <tr>
              <th style={cellLabel}>販売価格</th>
              <td style={cellValue}>正式サービス開始時点にて別途告知いたします。{"\n"}事前登録段階では料金は発生しません。</td>
            </tr>
            <tr>
              <th style={cellLabel}>商品代金以外の必要料金</th>
              <td style={cellValue}>インターネット接続料、通信費等はお客様のご負担となります。</td>
            </tr>
            <tr>
              <th style={cellLabel}>支払方法</th>
              <td style={cellValue}>クレジットカード、デビットカード、銀行振込、各種決済サービス(正式サービス開始時に確定)</td>
            </tr>
            <tr>
              <th style={cellLabel}>支払時期</th>
              <td style={cellValue}>各商品のご注文時に即時決済</td>
            </tr>
            <tr>
              <th style={cellLabel}>商品引渡時期</th>
              <td style={cellValue}>決済完了後、即時ご利用いただけます(別途明示された商品は明示時期に提供)</td>
            </tr>
            <tr>
              <th style={cellLabel}>返品・キャンセル</th>
              <td style={cellValue}>デジタルサービスの性質上、利用開始後の返品・キャンセルはお受けできない場合があります。{"\n"}未利用の有料サービスについては、契約締結日から8日以内にご連絡いただいた場合、特定商取引法および関連法令に基づき対応いたします。</td>
            </tr>
            <tr>
              <th style={cellLabel}>解約</th>
              <td style={cellValue}>会員はいつでも退会および契約解除を申請することができ、関連法令に従い利用期間に応じて返金いたします。</td>
            </tr>
            <tr>
              <th style={cellLabel}>動作環境</th>
              <td style={cellValue}>最新版の Chrome, Safari, Edge, Firefox ブラウザ{"\n"}iOS 15 以上、Android 10 以上</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>消費者相談窓口</H2>
      <P>
        サービスのご利用に関するお問い合わせ・苦情は上記メールアドレスまでご連絡ください。
        解決が困難な場合、消費者庁(www.caa.go.jp)、国民生活センター(www.kokusen.go.jp)、消費生活センター等の相談窓口をご利用いただけます。
      </P>
    </article>
  );
}
