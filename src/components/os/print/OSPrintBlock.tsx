"use client";

import { OSPrintProps } from "./types";

import {
  formatNumber,
  getEntradaDate,
  getMedida,
  getMedidas,
  getOSNumber,
  getSaidaDate,
  getUnidadeMedida,
} from "./helpers";

function EmptyRows({
  rows = 7,
  type = "normal",
}: {
  rows?: number;
  type?: "normal" | "fundicao";
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index}>
          {type === "fundicao" ? (
            <>
              <td className="center bold">
                {index + 2}
              </td>
              <td></td>
              <td></td>
              <td colSpan={10}></td>
              <td></td>
            </>
          ) : (
            <>
              <td></td>
              <td></td>
              <td colSpan={9}></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </>
          )}
        </tr>
      ))}
    </>
  );
}

export default function OSPrintBlock({
  os,
  obs,
  setor,
  tipo = "normal",
}: OSPrintProps) {
  const medidas = getMedidas(os.medidas);

  const entrada = getEntradaDate(os);
  const saida = getSaidaDate(os);

  const medidaUnidade =
    getUnidadeMedida(medidas, 2) ||
    getUnidadeMedida(medidas, 0) ||
    "MM";

  const osNumber = getOSNumber(os);

  if (tipo === "fundicao") {
    return (
      <section className="print-block">
        <table className="os-table">
          <tbody>
            <tr>
              <th colSpan={3}>
                Nº ORDEM DE SERVIÇO (OS)
              </th>

              <td
                colSpan={10}
                className="center bold big"
              >
                {osNumber}
              </td>

              <td className="center bold big">
                1/1
              </td>
            </tr>

            <tr>
              <th colSpan={3}>SETOR</th>

              <td
                colSpan={7}
                className="center bold"
              >
                {setor}
              </td>

              <th colSpan={2}>
                Nº PED. DO CLIENTE
              </th>

              <td colSpan={2}></td>
            </tr>

            <tr>
              <td colSpan={10}></td>

              <th colSpan={2}>
                PESO TOTAL
              </th>

              <td colSpan={2}></td>
            </tr>

            <tr className="blue">
              <th>IT</th>
              <th>QT</th>
              <th>LIGA</th>
              <th colSpan={10}>
                FORMATO
              </th>
              <th>PESO BRUTO</th>
            </tr>

            <tr>
              <td className="center bold">
                1
              </td>

              <td className="center">
                {formatNumber(os.quantidade)}
              </td>

              <td className="center">
                {os.liga}
              </td>

              <td className="center">
                {os.item}
              </td>

              <td className="center">
                {getMedida(medidas, 0)}
              </td>

              <td className="center">
                X
              </td>

              <td className="center">
                {getMedida(medidas, 1)}
              </td>

              <td className="center">
                X
              </td>

              <td className="center">
                {getMedida(medidas, 2)}
              </td>

              <td className="center">
                {medidaUnidade}
              </td>

              <td></td>
              <td></td>
              <td></td>

              <td className="center">
                {formatNumber(os.peso_total)}
              </td>
            </tr>

            <EmptyRows
              rows={7}
              type="fundicao"
            />

            <tr>
              <th colSpan={2}>
                ENTRADA DA OS
              </th>

              <td
                colSpan={2}
                className="center bold"
              >
                {entrada}
              </td>

              <th rowSpan={2}>OBS</th>

              <td
                colSpan={9}
                rowSpan={2}
                className="center obs"
              >
                {obs}
              </td>
            </tr>

            <tr>
              <th colSpan={2}>
                SAÍDA DA OS
              </th>

              <td
                colSpan={2}
                className="center bold"
              >
                {saida}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }

  return (
    <section className="print-block">
      <table className="os-table">
        <tbody>
          {!setor && (
            <>
              <tr>
                <th>EMPRESA</th>

                <td
                  colSpan={7}
                  className="center"
                >
                  {os.cliente}
                </td>

                <th colSpan={4}>
                  Nº ORDEM DE SERVIÇO (OS)
                </th>

                <td
                  colSpan={2}
                  className="center bold"
                >
                  {osNumber}
                </td>

                <td
                  colSpan={2}
                  className="center bold"
                >
                  1/1
                </td>
              </tr>

              <tr>
                <th>COMPRADOR</th>

                <td colSpan={7}></td>

                <th colSpan={4}>
                  Nº PED. DO CLIENTE
                </th>

                <td colSpan={4}></td>
              </tr>

              <tr>
                <th>VENDEDOR</th>

                <td
                  colSpan={7}
                  className="center"
                >
                  {os.vendedor}
                </td>

                <th colSpan={4}>
                  PESO TOTAL
                </th>

                <td
                  colSpan={4}
                  className="center bold"
                >
                  {formatNumber(os.peso_total)}
                </td>
              </tr>
            </>
          )}

          {setor && (
            <>
              <tr>
                <th colSpan={4}>
                  Nº ORDEM DE SERVIÇO (OS)
                </th>

                <td
                  colSpan={8}
                  className="center bold big"
                >
                  {osNumber}
                </td>

                <td
                  colSpan={4}
                  className="center bold big"
                >
                  1/1
                </td>
              </tr>

              <tr>
                <th colSpan={4}>
                  SETOR
                </th>

                <td
                  colSpan={5}
                  className="center bold"
                >
                  {setor}
                </td>

                <th colSpan={3}>
                  Nº PED. DO CLIENTE
                </th>

                <td colSpan={4}></td>
              </tr>

              <tr>
                <td colSpan={9}></td>

                <th colSpan={3}>
                  PESO TOTAL
                </th>

                <td colSpan={4}></td>
              </tr>
            </>
          )}

          <tr className="blue">
            <th>QT</th>
            <th>LIGA</th>
            <th colSpan={9}>
              FORMATO
            </th>
            <th colSpan={2}>
              SOBRE
              <br />
              METAL
            </th>
            <th>PESO</th>
            <th>PESO FINAL</th>
            <th>
              VENDA
              <br />
              POR
            </th>
          </tr>

          <tr>
            <td className="center">
              {formatNumber(os.quantidade)}
            </td>

            <td className="center">
              {os.liga}
            </td>

            <td
              colSpan={2}
              className="center"
            >
              {os.item}
            </td>

            <td className="center">
              {getMedida(medidas, 0)}
            </td>

            <td className="center">
              X
            </td>

            <td className="center">
              {getMedida(medidas, 1)}
            </td>

            <td className="center">
              X
            </td>

            <td className="center">
              {getMedida(medidas, 2)}
            </td>

            <td className="center">
              {medidaUnidade}
            </td>

            <td></td>

            <td className="center">
              {formatNumber(os.sobre_metal)}
            </td>

            <td className="center">
              {medidaUnidade}
            </td>

            <td className="center gray">
              {formatNumber(os.peso_total)}
            </td>

            <td></td>

            <td className="center bold">
              {os.unidade}
            </td>
          </tr>

          <EmptyRows rows={7} />

          <tr>
            <th colSpan={2}>
              ENTRADA DA OS
            </th>

            <td
              colSpan={2}
              className="center bold"
            >
              {entrada}
            </td>

            <th rowSpan={2}>OBS</th>

            <td
              colSpan={11}
              rowSpan={2}
              className="center obs"
            >
              {obs}
            </td>
          </tr>

          <tr>
            <th colSpan={2}>
              SAÍDA DA OS
            </th>

            <td
              colSpan={2}
              className="center bold"
            >
              {saida}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}