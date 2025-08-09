export default function Disclaimer() {
  return (
    <div className="border rounded-xl">
      <div className="bg-muted rounded-t-xl px-4 sm:px-6 py-4 border-b">
        <h4 className="font-semibold text-lg">Disclaimer</h4>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <div className={styles.container}>
          <h5 className={styles.title}>Inspection Nature:</h5>
          <p className={styles.text}>
            Company's vehicle inspections are purely visual and non-mechanical.
            No vehicle component disassembly will occur during the inspection.
            Despite using industry-recognized fault detection techniques, it is
            possible that not all vehicle faults will be identified. Our
            comprehensive inspection covers the vehicle's body, interior,
            exterior, electrical and engine systems, cooling, exhaust, braking,
            fuel, steering and suspension, safety, transmission, final drive
            systems, chassis, and understructure, and includes a road test where
            applicable.
          </p>
        </div>

        <div className={styles.container}>
          <h5 className={styles.title}>Limitation of Liability:</h5>
          <p className={styles.text}>
            Company's inspectors are not accountable for identifying every
            defect, including those not visually evident during inspection or
            those that may occur post-inspection. Our report represents the
            vehicle's condition solely at the inspection time and date. It
            should not be mistaken for a roadworthy certificate, nor does it
            encompass manufacturer recall notices. The onus is on the buyer to
            visually assess the vehicle's condition at the point of sale.
          </p>
        </div>

        <div className={styles.container}>
          <h5 className={styles.title}>Non-Involvement in Transactions:</h5>
          <p className={styles.text}>
            Company's representatives, or any affiliated company shall bear no
            responsibility for any agreements, transactions, or discussions
            between parties concerning any vehicle inspected by us.
            Additionally, Company will not engage in mediating disputes arising
            from such transactions.
          </p>
        </div>

        <div className={styles.container}>
          <h5 className={styles.title}>No Warranty on Information:</h5>
          <p className={styles.text}>
            Subject to applicable laws, Company offers no warranty,
            guarantee, or representation regarding the inspection report's
            accuracy, completeness, reliability, or suitability for any intended
            purpose. Users of the report agree that Company is not liable
            for any direct, indirect, incidental, or consequential damages or
            losses that may result from reliance on our report.
          </p>
        </div>

        <div className={styles.container}>
          <h5 className={styles.title}>Exclusion of Liability:</h5>
          <p className={styles.text}>
            Company's inspectors will not be liable for any loss of use,
            production, profit, revenue, data, or any anticipated savings, nor
            for any delays, increased operating costs, or any form of economic
            loss resulting directly or indirectly from the use of our inspection
            service or report. By engaging Company for vehicle inspection
            services, you acknowledge and accept these terms as part of our
            service agreement. For a detailed understanding of our services,
            please refer to our{" "}
            <a target="_blank" className="underline text-primary" href="#">
              {" "}
              Terms and Conditions
            </a>{" "}
            .
          </p>
        </div>

        <div className={styles.container}>
          <h5 className={styles.title}>
            Information Sources and Accuracy Limitations:
          </h5>
          <p className={styles.text}>
            Information is sourced from the PPSR, third-party databases,
            diagnostic tools, and available service records at the time of
            inspection. Company uses advanced equipment to assess the
            vehicle, where applicable, at the time of inspection. While every
            effort is made, we do not guarantee the accuracy, completeness, or
            future condition of the vehicle.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  title: "font-medium",
  text: "text-text text-sm leading-relaxed",
  container: "space-y-1",
};
