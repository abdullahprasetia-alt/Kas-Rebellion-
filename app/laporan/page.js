"use client";
import { useState } from "react";

export default function Laporan() {
  const [data] = useState([
    { nama: "Adit", tipe: "masuk", jumlah: 50000 },
    { nama: "Budi", tipe: "keluar", jumlah: 20000 },
    { nama: "Rian", tipe: "masuk", jumlah: 75000 }
  ]);

  const pemasukan = data.filter(d => d.tipe === "masuk");
  const pengeluaran = data.filter(d => d.tipe === "keluar");

  const totalMasuk = pemasukan.reduce((a, b) => a + b.jumlah, 0);
  const totalKeluar = pengeluaran.reduce((a, b) => a + b.jumlah, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: 20
    }}>
      <h1>📊 Laporan Keuangan</h1>

      {/* SUMMARY */}
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <div style={box("#22c55e")}>
          <h3>Pemasukan</h3>
          <p>Rp {totalMasuk}</p>
        </div>

        <div style={box("#ef4444")}>
          <h3>Pengeluaran</h3>
          <p>Rp {totalKeluar}</p>
        </div>
      </div>

      {/* LIST PEMASUKAN */}
      <div style={card}>
        <h2>🟢 Pemasukan</h2>
        {pemasukan.map((d, i) => (
          <div key={i}>
            {d.nama} - Rp {d.jumlah}
          </div>
        ))}
      </div>

      {/* LIST PENGELUARAN */}
      <div style={card}>
        <h2>🔴 Pengeluaran</h2>
        {pengeluaran.map((d, i) => (
          <div key={i}>
            {d.nama} - Rp {d.jumlah}
          </div>
        ))}
      </div>
    </div>
  );
}

const box = (color) => ({
  flex: 1,
  background: "#1e293b",
  padding: 15,
  borderRadius: 10,
  borderLeft: `5px solid ${color}`
});

const card = {
  marginTop: 20,
  background: "#1e293b",
  padding: 20,
  borderRadius: 10
};
