from core.tasks.pessoa import PessoaTask


class PessoaService:
    def create_person(self, dados):
        pessoa = PessoaTask().create_person(dados)
        return pessoa

    def change_person(self, pessoa_id, dados):
        pessoa = PessoaTask().change_person(pessoa_id, dados)
        for attr, value in dados.items():
            setattr(pessoa, attr, value)
        pessoa.save()
        return pessoa

    def delete_person(self, pessoa_id):
        pessoa = PessoaTask().change_person(pessoa_id)
        pessoa.delete()

    def search_person(self, pessoa_id):
        return PessoaTask().change_person(pessoa_id)
