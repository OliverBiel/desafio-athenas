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
        pessoa = PessoaTask().delete_person(pessoa_id)
        return pessoa
    
    def get_person(self, pessoa_id):
        return PessoaTask().get_person(pessoa_id)

    def list_person(self):
        return PessoaTask().list_person()

    def calculate_weight(self, pessoa):
        return PessoaTask().calculate_weight(pessoa)