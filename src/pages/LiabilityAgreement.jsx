import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function LiabilityAgreement() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 via-teal-800 to-teal-900 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-lime-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileText className="w-6 h-6 md:w-8 md:h-8 text-teal-900" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Liability Release Agreement
          </h1>
          <p className="text-base md:text-xl text-cyan-100">
            Powers Home Rentals - Rental Terms & Conditions
          </p>
        </motion.div>

        <Card className="shadow-2xl border-2 border-teal-600/30 bg-teal-800/50 backdrop-blur-sm">
          <CardContent className="p-6 md:p-12">
            <div className="prose prose-lg max-w-none text-white">
              {/* Introduction */}
              <div className="bg-cyan-600/20 border-2 border-cyan-500 rounded-xl p-4 md:p-6 mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-cyan-200 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 md:w-6 md:h-6" />
                  Agreement Overview
                </h2>
                <p className="text-cyan-100 leading-relaxed text-sm md:text-base">
                  This Liability Release Agreement ("Agreement") is entered into between Powers Home Rentals ("Lessor") and the customer ("Lessee") for the rental of washer and dryer appliances. By signing this agreement and accepting delivery of the rental equipment, the Lessee acknowledges and agrees to the following terms and conditions.
                </p>
              </div>

              {/* Clause 1 */}
              <div className="mb-8">
                <h3 className="text-lg md:text-2xl font-bold text-lime-400 mb-4 border-b-2 border-teal-600 pb-2">
                  1. Release of Liability for Property Damage
                </h3>
                <p className="text-teal-100 leading-relaxed mb-3 text-sm md:text-base">
                  The Lessee hereby releases, waives, discharges, and covenants not to sue Powers Home Rentals, its owners, employees, agents, or representatives from any and all liability, claims, demands, actions, or causes of action whatsoever arising out of or related to any loss, damage, or injury, including but not limited to:
                </p>
                <ul className="list-disc pl-6 md:pl-8 text-teal-100 space-y-2 mb-3 text-sm md:text-base">
                  <li><strong className="text-white">Water damage</strong> of any kind, including flooding, leaks, or water intrusion</li>
                  <li><strong className="text-white">Property damage</strong> to floors, walls, ceilings, or any other structures</li>
                  <li><strong className="text-white">Mold, mildew, or moisture-related damage</strong> resulting from the use or malfunction of the rented appliances</li>
                  <li><strong className="text-white">Electrical damage</strong> or power surges related to the appliances</li>
                  <li><strong className="text-white">Any consequential damages</strong> resulting from appliance malfunction or failure</li>
                </ul>
                <p className="text-teal-100 leading-relaxed text-sm md:text-base">
                  The Lessee acknowledges that Powers Home Rentals shall not be held responsible for any damages to the property where the appliances are installed.
                </p>
              </div>

              {/* Clause 2 */}
              <div className="mb-8">
                <h3 className="text-lg md:text-2xl font-bold text-lime-400 mb-4 border-b-2 border-teal-600 pb-2">
                  2. Proper Use and Care of Equipment
                </h3>
                <p className="text-teal-100 leading-relaxed mb-3 text-sm md:text-base">
                  The Lessee agrees to use the rented washer and dryer appliances in accordance with the manufacturer's instructions and industry standards for proper operation. The Lessee specifically agrees to:
                </p>
                <ul className="list-disc pl-6 md:pl-8 text-teal-100 space-y-2 text-sm md:text-base">
                  <li><strong className="text-white">Not overload</strong> the machines beyond their recommended capacity</li>
                  <li><strong className="text-white">Not abuse, misuse, or tamper</strong> with the appliances in any manner</li>
                  <li><strong className="text-white">Not modify or alter</strong> any components of the machines</li>
                  <li><strong className="text-white">Use appropriate detergents</strong> as recommended by the manufacturer</li>
                  <li><strong className="text-white">Follow all safety guidelines</strong> provided with the equipment</li>
                  <li><strong className="text-white">Immediately report</strong> any malfunctions or issues to Powers Home Rentals</li>
                </ul>
              </div>

              {/* Clause 3 */}
              <div className="mb-8">
                <h3 className="text-lg md:text-2xl font-bold text-lime-400 mb-4 border-b-2 border-teal-600 pb-2">
                  3. Prohibition on Removal or Relocation
                </h3>
                <p className="text-teal-100 leading-relaxed mb-3 text-sm md:text-base">
                  The Lessee agrees that the rented appliances shall remain at the delivery address specified in the rental agreement at all times. The Lessee specifically agrees to:
                </p>
                <ul className="list-disc pl-6 md:pl-8 text-teal-100 space-y-2 text-sm md:text-base">
                  <li><strong className="text-white">Not remove</strong> the appliances from the designated property address</li>
                  <li><strong className="text-white">Not relocate</strong> the appliances without prior written consent</li>
                  <li><strong className="text-white">Not transfer possession</strong> to any third party</li>
                  <li><strong className="text-white">Not sell, lend, or sublease</strong> the rented equipment</li>
                </ul>
              </div>

              {/* Clause 4 */}
              <div className="mb-8">
                <h3 className="text-lg md:text-2xl font-bold text-lime-400 mb-4 border-b-2 border-teal-600 pb-2">
                  4. Responsibility for Damage Due to Misuse or Negligence
                </h3>
                <p className="text-teal-100 leading-relaxed mb-3 text-sm md:text-base">
                  The Lessee acknowledges and agrees that they shall be solely responsible for any damage to the rented appliances that results from:
                </p>
                <ul className="list-disc pl-6 md:pl-8 text-teal-100 space-y-2 mb-3 text-sm md:text-base">
                  <li><strong className="text-white">Misuse</strong> of the equipment, including overloading or using improper detergents</li>
                  <li><strong className="text-white">Negligence</strong> in caring for or maintaining the appliances</li>
                  <li><strong className="text-white">Abuse</strong> or intentional damage to the equipment</li>
                  <li><strong className="text-white">Tampering</strong> with or attempting to repair the machines without authorization</li>
                </ul>
              </div>

              {/* Additional Terms */}
              <div className="mb-8">
                <h3 className="text-lg md:text-2xl font-bold text-lime-400 mb-4 border-b-2 border-teal-600 pb-2">
                  5. Additional Terms and Conditions
                </h3>
                <div className="space-y-4 text-teal-100 text-sm md:text-base">
                  <div>
                    <h4 className="font-bold text-white mb-2">5.1 Monthly Rental Rate</h4>
                    <p className="leading-relaxed">The Lessee agrees to pay $59.00 per month for the rental of the washer and dryer set, billed monthly via automatic payment through Stripe.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">5.2 Minimum Commitment</h4>
                    <p className="leading-relaxed">This rental agreement requires a minimum commitment of six (6) months.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">5.3 Maintenance and Service</h4>
                    <p className="leading-relaxed">Powers Home Rentals will provide maintenance and repair services for equipment malfunctions that occur under normal use at no additional charge.</p>
                  </div>
                </div>
              </div>

              {/* Acknowledgment */}
              <div className="bg-yellow-600/20 border-2 border-yellow-500 rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-2xl font-bold text-yellow-200 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
                  Customer Acknowledgment
                </h3>
                <p className="text-yellow-100 leading-relaxed mb-3 text-sm md:text-base">
                  By proceeding with this rental agreement and accepting delivery of the equipment, the Lessee acknowledges that they have:
                </p>
                <ul className="list-disc pl-6 md:pl-8 text-yellow-100 space-y-2 mb-3 text-sm md:text-base">
                  <li>Read and fully understand this Liability Release Agreement</li>
                  <li>Had the opportunity to ask questions and seek legal counsel if desired</li>
                  <li>Voluntarily agree to all terms and conditions set forth herein</li>
                  <li>Understand that this agreement limits the liability of Powers Home Rentals</li>
                  <li>Accept full responsibility for proper use and care of the equipment</li>
                </ul>
                <p className="text-yellow-100 leading-relaxed font-semibold text-sm md:text-base">
                  This Agreement shall be governed by the laws of the State of Arizona.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mt-8 text-center p-4 md:p-6 bg-teal-900/50 rounded-xl border-2 border-teal-600">
                <h4 className="font-bold text-white mb-3 text-base md:text-lg">Questions About This Agreement?</h4>
                <p className="text-teal-200 mb-4 text-sm md:text-base">Contact Powers Home Rentals for clarification:</p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center text-lime-400 font-semibold text-sm md:text-base">
                  <a href="tel:928-830-3278" className="hover:underline">📞 928-830-3278</a>
                  <a href="mailto:Powershomerentals@gmail.com" className="hover:underline break-all">✉️ Powershomerentals@gmail.com</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}