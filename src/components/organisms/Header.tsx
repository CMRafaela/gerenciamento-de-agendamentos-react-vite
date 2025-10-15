import { Logo } from "@/components/atoms/Logo";
import { Avatar } from "@/components/molecules/Avatar";
import { CalendarIcon } from "@/components/atoms/CalendarIcon";

export function Header() {
  return (
    <header className="w-full border-b bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-3 items-center gap-4">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:underline focus:text-white">
          Pular para o conteúdo
        </a>
        <div className="justify-self-start">
          <Logo size={48} />
        </div>
        <nav aria-label="Principal" className="justify-self-center">
          <ul className="flex items-center gap-6 text-sm text-slate-200">
            <li>
              <a
                href="#agendamentos"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded inline-flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                Agendamentos
              </a>
            </li>
            <li>
              <a
                href="#relatorios"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                Relatórios
              </a>
            </li>
            <li>
              <a
                href="#configuracoes"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                Configurações
              </a>
            </li>
          </ul>
        </nav>
        <div className="justify-self-end">
          <Avatar size={40} />
        </div>
      </div>
    </header>
  );
}
